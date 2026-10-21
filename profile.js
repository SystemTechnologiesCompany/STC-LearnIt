(() => {
  const config = window.STC_SUPABASE_CONFIG || {};
  const client = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(config.url || '') &&
    typeof config.publishableKey === 'string' && config.publishableKey.startsWith('sb_publishable_')
    ? window.supabase?.createClient(config.url, config.publishableKey, {
        auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
      })
    : null;

  const PROFILE_COLUMNS = 'id,public_id,display_name,faculty,avatar_url';
  const FACULTY_NAMES = {
    medicine: 'Faculty of Medicine',
    itc: 'Faculty of New Information Technologies & Communication',
    earth: 'Faculty of Hydrocarbons, Renewable Energy, Earth & Universe Sciences',
    technology: 'Institute of Technology',
    'natural-sciences': 'Faculty of Natural Sciences and Life',
    'applied-sciences': 'Faculty of Applied Sciences',
    mathematics: 'Faculty of Mathematics and Matter Sciences',
    economics: 'Faculty of Economics, Commercial Sciences and Management',
    arts: 'Faculty of Arts and Languages',
    law: 'Faculty of Law and Political Sciences',
    humanities: 'Faculty of Humanities and Social Sciences',
    sports: 'Institute of Science and Techniques of Physical and Sporting Activities'
  };
  const gate = document.querySelector('#profileAuthGate');
  const layout = document.querySelector('#profileLayout');
  const gateTitle = document.querySelector('#profileGateTitle');
  const gateMessage = document.querySelector('#profileGateMessage');
  const loginLink = document.querySelector('#profileLoginLink');
  const retryButton = document.querySelector('#profileRetry');
  const signOutButton = document.querySelector('#profileSignOut');
  const searchInput = document.querySelector('#userSearchInput');
  const peopleList = document.querySelector('#peopleList');
  const form = document.querySelector('#profileForm');
  let user = null;
  let profile = null;
  let followingIds = new Set();
  let queryVersion = 0;
  let toastTimer;

  const isFrench = () => document.documentElement.dataset.language === 'fr';
  const text = (english, french) => isFrench() ? french : english;
  function toast(message) {
    const node = document.querySelector('#profileToast');
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 3200);
  }
  function showGate({ title, message, canLogin = false, retry = false } = {}) {
    layout.hidden = true;
    gate.hidden = false;
    gateTitle.textContent = title || text('Sign in to manage your profile.', 'Connectez-vous pour gérer votre profil.');
    gateMessage.textContent = message || text(
      'Your profile, Learnit ID, followers and classmates are connected to your student account.',
      'Votre profil, votre identifiant Learnit, vos abonnés et vos camarades sont liés à votre compte étudiant.'
    );
    loginLink.hidden = !canLogin;
    retryButton.hidden = !retry;
    signOutButton.hidden = true;
  }
  function showProfile() {
    gate.hidden = true;
    layout.hidden = false;
    signOutButton.hidden = false;
  }
  function setPresence() {
    const online = Boolean(user && navigator.onLine && document.visibilityState === 'visible');
    const badge = document.querySelector('#presenceBadge');
    badge.classList.toggle('online', online);
    badge.classList.toggle('offline', !online);
    document.querySelector('#presenceLabel').textContent = online ? 'ONLINE' : 'OFFLINE';
  }
  function renderProfile() {
    const displayName = profile.display_name || 'STC Learner';
    document.querySelector('#displayName').textContent = displayName;
    document.querySelector('#nameInput').value = profile.display_name || '';
    document.querySelector('#facultySelect').value = profile.faculty || '';
    document.querySelector('#displayFaculty').textContent = FACULTY_NAMES[profile.faculty] || text('Faculty not selected', 'Aucune faculté sélectionnée');
    document.querySelector('#displayId').textContent = profile.public_id;
    document.querySelector('#editId').textContent = profile.public_id;
    const avatar = document.querySelector('#profileAvatar');
    avatar.textContent = profile.avatar_url ? '' : displayName.trim().charAt(0).toUpperCase();
    avatar.style.backgroundImage = profile.avatar_url ? `url("${profile.avatar_url}")` : '';
  }
  async function loadOwnCounts() {
    const [followersResult, followingResult, followingIdsResult] = await Promise.all([
      client.from('follows').select('follower_id', { count: 'exact', head: true }).eq('following_id', user.id),
      client.from('follows').select('following_id', { count: 'exact', head: true }).eq('follower_id', user.id),
      client.from('follows').select('following_id').eq('follower_id', user.id)
    ]);
    const resultError = followersResult.error || followingResult.error || followingIdsResult.error;
    if (resultError) throw resultError;
    document.querySelector('#followerCount').textContent = followersResult.count || 0;
    document.querySelector('#followingCount').textContent = followingResult.count || 0;
    followingIds = new Set((followingIdsResult.data || []).map(row => row.following_id));
  }
  async function loadOwnProfile() {
    let { data, error } = await client.from('profiles').select(PROFILE_COLUMNS).eq('id', user.id).maybeSingle();
    if (error) throw error;
    if (!data) {
      const preferredName = String(user.user_metadata?.display_name || '').trim().slice(0, 32) || 'STC Learner';
      const inserted = await client.from('profiles').insert({ id: user.id, display_name: preferredName }).select(PROFILE_COLUMNS).single();
      if (inserted.error) {
        const retry = await client.from('profiles').select(PROFILE_COLUMNS).eq('id', user.id).maybeSingle();
        if (retry.error || !retry.data) throw inserted.error;
        data = retry.data;
      } else data = inserted.data;
    }
    return data;
  }
  function setDatabaseError(error) {
    console.error('STC Learnit profile setup:', error);
    const notReady = /relation .* does not exist|permission denied|row-level security/i.test(error?.message || '');
    showGate({
      title: text('Your student profile is not ready yet.', 'Votre profil étudiant n’est pas encore prêt.'),
      message: notReady
        ? text('The profile database needs its setup SQL. Run the latest supabase/setup.sql in the Supabase SQL Editor, then try again.', 'La base de données du profil nécessite son script d’installation. Exécutez le fichier supabase/setup.sql dans l’éditeur SQL de Supabase, puis réessayez.')
        : text('We could not load your profile. Check your connection and try again.', 'Impossible de charger votre profil. Vérifiez votre connexion et réessayez.'),
      retry: true
    });
  }
  async function loadAccount(nextUser) {
    user = nextUser || null;
    setPresence();
    if (!user) {
      followingIds = new Set();
      showGate({ canLogin: true });
      return;
    }
    showProfile();
    try {
      profile = await loadOwnProfile();
      renderProfile();
      await Promise.all([loadOwnCounts(), renderPeople(searchInput.value)]);
    } catch (error) {
      setDatabaseError(error);
    }
  }
  function showEmpty(message) {
    const empty = document.createElement('div');
    empty.className = 'empty-search';
    empty.textContent = message;
    peopleList.replaceChildren(empty);
  }
  function makePersonRow(person) {
    const row = document.createElement('div');
    row.className = 'person-row';
    const avatar = document.createElement('div');
    avatar.className = 'person-avatar';
    if (person.avatar_url) {
      avatar.style.backgroundImage = `url("${person.avatar_url}")`;
      avatar.setAttribute('aria-label', person.display_name);
    } else {
      avatar.textContent = (person.display_name || '?').trim().charAt(0).toUpperCase();
    }
    const details = document.createElement('div');
    details.className = 'person-details';
    const name = document.createElement('strong');
    name.textContent = person.display_name || 'STC Learner';
    const info = document.createElement('small');
    info.textContent = `${person.public_id} · ${FACULTY_NAMES[person.faculty] || ''}`;
    details.append(name, info);
    row.append(avatar, details);

    if (person.id !== user.id) {
      const followed = followingIds.has(person.id);
      const button = document.createElement('button');
      button.className = `follow-button${followed ? ' following' : ''}`;
      button.type = 'button';
      button.textContent = followed ? text('Following', 'Abonné·e') : text('＋ Follow', '＋ Suivre');
      button.setAttribute('aria-pressed', String(followed));
      button.addEventListener('click', () => toggleFollow(person.id, button));
      row.appendChild(button);
    }
    return row;
  }
  async function renderPeople(query = '') {
    if (!user || !profile) return;
    const version = ++queryVersion;
    const normalized = query.trim().toUpperCase().replace(/\s+/g, '');
    document.querySelector('#resultsHeading').textContent = normalized
      ? text('Search results', 'Résultats de recherche')
      : text('Suggested classmates', 'Camarades suggérés');
    document.querySelector('#suggestionContext').textContent = normalized
      ? text('SEARCH RESULTS', 'RÉSULTATS')
      : profile.faculty ? text('SAME FACULTY', 'MÊME FACULTÉ') : text('CHOOSE FACULTY', 'CHOISISSEZ UNE FACULTÉ');
    peopleList.setAttribute('aria-busy', 'true');
    try {
      let request = client.from('profiles').select(PROFILE_COLUMNS).neq('id', user.id).limit(12);
      if (normalized) {
        request = request.eq('public_id', normalized);
      } else if (profile.faculty) {
        request = request.eq('faculty', profile.faculty).order('display_name', { ascending: true });
      } else {
        if (version === queryVersion) showEmpty(text('Choose your faculty in Edit your profile to see suggested classmates.', 'Choisissez votre faculté dans Modifier votre profil pour voir des camarades suggérés.'));
        return;
      }
      const { data, error } = await request;
      if (error) throw error;
      if (version !== queryVersion) return;
      const people = data || [];
      if (!people.length) {
        showEmpty(normalized
          ? text('No student found with this Learnit ID. Check the ID and try again.', 'Aucun étudiant trouvé avec cet identifiant Learnit. Vérifiez-le et réessayez.')
          : text('No classmates from your faculty have joined yet.', 'Aucun camarade de votre faculté n’a encore rejoint la plateforme.'));
        return;
      }
      peopleList.replaceChildren(...people.map(makePersonRow));
    } catch (error) {
      if (version === queryVersion) {
        console.error('STC Learnit classmate search:', error);
        showEmpty(text('Could not load classmates. Try again in a moment.', 'Impossible de charger les camarades. Réessayez dans un instant.'));
      }
    } finally {
      if (version === queryVersion) peopleList.removeAttribute('aria-busy');
    }
  }
  async function toggleFollow(targetId, button) {
    button.disabled = true;
    const alreadyFollowing = followingIds.has(targetId);
    const result = alreadyFollowing
      ? await client.from('follows').delete().eq('follower_id', user.id).eq('following_id', targetId)
      : await client.from('follows').insert({ follower_id: user.id, following_id: targetId });
    button.disabled = false;
    if (result.error) {
      toast(text('Could not update your follows. Please try again.', 'Impossible de mettre à jour vos abonnements. Réessayez.'));
      return;
    }
    if (alreadyFollowing) followingIds.delete(targetId);
    else followingIds.add(targetId);
    await Promise.all([loadOwnCounts(), renderPeople(searchInput.value)]);
  }
  async function startProfile() {
    if (!client) {
      showGate({
        title: text('Student accounts are unavailable.', 'Les comptes étudiants sont indisponibles.'),
        message: text('The Supabase client could not load. Open this page from the hosted website and check the Supabase configuration.', 'Le client Supabase n’a pas pu être chargé. Ouvrez cette page depuis le site hébergé et vérifiez la configuration Supabase.')
      });
      return;
    }
    const { data, error } = await client.auth.getSession();
    if (error) {
      showGate({ message: text('We could not check your sign-in. Refresh the page and try again.', 'Impossible de vérifier votre connexion. Actualisez la page et réessayez.'), canLogin: true });
      return;
    }
    await loadAccount(data.session?.user || null);
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!user || !profile) return;
    const displayName = document.querySelector('#nameInput').value.trim();
    const faculty = document.querySelector('#facultySelect').value;
    if (!displayName || displayName.length > 32 || !faculty) return;
    const saveButton = form.querySelector('[type="submit"]');
    saveButton.disabled = true;
    const { data, error } = await client.from('profiles').update({
      display_name: displayName,
      faculty,
      updated_at: new Date().toISOString()
    }).eq('id', user.id).select(PROFILE_COLUMNS).single();
    saveButton.disabled = false;
    if (error) {
      toast(text('Could not save your profile. Please try again.', 'Impossible d’enregistrer votre profil. Réessayez.'));
      return;
    }
    profile = data;
    renderProfile();
    await renderPeople(searchInput.value);
    toast(text('Profile updated ✓', 'Profil mis à jour ✓'));
  });

  document.querySelector('#photoInput').addEventListener('change', async event => {
    const file = event.target.files?.[0];
    if (!file || !user || !profile) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast(text('Choose a JPG, PNG or WebP image.', 'Choisissez une image JPG, PNG ou WebP.'));
      event.target.value = '';
      return;
    }
    if (file.size > 1_500_000) {
      toast(text('Choose an image smaller than 1.5 MB.', 'Choisissez une image de moins de 1,5 Mo.'));
      event.target.value = '';
      return;
    }
    const photoButton = document.querySelector('.photo-edit');
    photoButton.setAttribute('aria-busy', 'true');
    try {
      const extension = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1];
      const path = `${user.id}/avatar-${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await client.storage.from('stc-avatars').upload(path, file, {
        cacheControl: '3600',
        contentType: file.type,
        upsert: false
      });
      if (uploadError) throw uploadError;
      const { data: urlData } = client.storage.from('stc-avatars').getPublicUrl(path);
      const { data, error } = await client.from('profiles').update({
        avatar_url: urlData.publicUrl,
        updated_at: new Date().toISOString()
      }).eq('id', user.id).select(PROFILE_COLUMNS).single();
      if (error) throw error;
      profile = data;
      renderProfile();
      await renderPeople(searchInput.value);
      toast(text('Profile photo updated.', 'Photo de profil mise à jour.'));
    } catch (error) {
      console.error('STC Learnit avatar upload:', error);
      toast(text('Could not upload your photo. Check the avatar storage setup and try again.', 'Impossible d’envoyer votre photo. Vérifiez la configuration du stockage des avatars et réessayez.'));
    } finally {
      photoButton.removeAttribute('aria-busy');
      event.target.value = '';
    }
  });

  document.querySelector('#peopleSearch').addEventListener('submit', event => {
    event.preventDefault();
    renderPeople(searchInput.value);
  });
  searchInput.addEventListener('input', () => renderPeople(searchInput.value));
  document.querySelector('#copyId').addEventListener('click', async () => {
    if (!profile?.public_id) return;
    try {
      await navigator.clipboard.writeText(profile.public_id);
    } catch {
      const temp = document.createElement('textarea');
      temp.value = profile.public_id;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
    }
    toast(text('Your Learnit ID was copied.', 'Votre identifiant Learnit a été copié.'));
  });
  signOutButton.addEventListener('click', async () => {
    const { error } = await client.auth.signOut();
    if (error) toast(text('Could not sign out. Please try again.', 'Impossible de vous déconnecter. Réessayez.'));
  });
  retryButton.addEventListener('click', startProfile);
  document.querySelector('#profileMenuToggle').addEventListener('click', () => document.querySelector('.main-nav').classList.toggle('open'));
  window.addEventListener('online', setPresence);
  window.addEventListener('offline', setPresence);
  window.addEventListener('pageshow', setPresence);
  document.addEventListener('visibilitychange', setPresence);
  window.addEventListener('stc:language-change', () => {
    if (profile) {
      renderProfile();
      renderPeople(searchInput.value);
    } else if (!user) {
      showGate({ canLogin: true });
    }
  });
  client?.auth.onAuthStateChange((_event, session) => {
    if (session?.user?.id !== user?.id) loadAccount(session?.user || null);
  });
  startProfile();
})();
