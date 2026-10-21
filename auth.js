(() => {
  const config = window.STC_SUPABASE_CONFIG || {};
  const configReady = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(config.url || '') &&
    typeof config.publishableKey === 'string' && config.publishableKey.length > 20 &&
    !config.publishableKey.includes('YOUR_');
  const supabaseClient = configReady && window.supabase?.createClient
    ? window.supabase.createClient(config.url, config.publishableKey, {
        auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
      })
    : null;
  window.stcSupabase = supabaseClient;

  const dialog = document.querySelector('#authDialog');
  const form = document.querySelector('#authForm');
  if (!dialog || !form) return;
  const title = document.querySelector('#authTitle');
  const description = document.querySelector('#authDescription');
  const feedback = document.querySelector('#authFeedback');
  const submit = document.querySelector('#emailSubmit');
  const modeSwitch = document.querySelector('#authModeSwitch');
  const nameField = document.querySelector('#signupNameField');
  const nameInput = document.querySelector('#signupName');
  const passwordInput = document.querySelector('#passwordInput');
  const passwordLabel = passwordInput.closest('label');
  let mode = 'signup';
  let currentSession = null;
  let busy = false;

  function text(key, en, fr) {
    const french = document.documentElement.dataset.language === 'fr';
    const value = french ? fr : en;
    const node = document.querySelector(key);
    if (node) node.textContent = value;
    return value;
  }
  function setFeedback(message, kind = 'info') {
    feedback.textContent = message;
    feedback.dataset.kind = kind;
  }
  function clearFeedback() { setFeedback(''); }
  function updateAuthUi() {
    const label = document.querySelector('#loginBtn .user-profile-inner > span');
    const loginButton = document.querySelector('#loginBtn');
    const createButton = document.querySelector('#signupBtn');
    const logoutButton = document.querySelector('#logoutBtn');
    const signedIn = Boolean(currentSession);
    if (label) label.textContent = document.documentElement.dataset.language === 'fr' ? 'Se connecter' : 'Log in';
    if (loginButton) loginButton.hidden = signedIn;
    if (createButton) createButton.hidden = signedIn;
    if (logoutButton) logoutButton.hidden = !signedIn;
    window.dispatchEvent(new CustomEvent('stc:auth-state', { detail: { session: currentSession } }));
  }
  function setMode(next) {
    mode = next;
    const french = document.documentElement.dataset.language === 'fr';
    title.textContent = next === 'signup'
      ? (french ? 'Rejoignez le parcours.' : 'Join the journey.')
      : (french ? 'Bon retour parmi nous.' : 'Welcome back.');
    description.textContent = next === 'signup'
      ? (french ? 'Créez votre compte pour enregistrer votre parcours, gagner des XP et garder votre série.' : 'Create your account to save your study path, earn XP and keep your streak going.')
      : (french ? 'Connectez-vous pour retrouver votre parcours et votre progression.' : 'Log in to return to your study path and progress.');
    nameField.hidden = next !== 'signup';
    nameInput.required = next === 'signup';
    passwordInput.autocomplete = next === 'signup' ? 'new-password' : 'current-password';
    passwordLabel.firstChild.textContent = french ? 'Mot de passe' : 'Password';
    passwordInput.placeholder = french ? '8 caractères minimum' : 'At least 8 characters';
    submit.innerHTML = next === 'signup'
      ? (french ? 'Créer un compte <span>↗</span>' : 'Create account <span>↗</span>')
      : (french ? 'Se connecter <span>↗</span>' : 'Log in <span>↗</span>');
    modeSwitch.textContent = next === 'signup'
      ? (french ? 'Vous avez déjà un compte ? Se connecter' : 'Already have an account? Log in')
      : (french ? 'Pas encore de compte ? Inscrivez-vous' : 'Need an account? Sign up');
    document.querySelector('.auth-divider span').textContent = french ? 'ou utilisez votre Gmail' : 'or use your Gmail';
    nameField.firstChild.textContent = french ? 'Nom de l’étudiant' : 'Student name';
    nameInput.placeholder = french ? 'Votre nom' : 'Your name';
    document.querySelector('#emailInput').closest('label').firstChild.textContent = french ? 'Adresse Gmail' : 'Gmail address';
    document.querySelector('#emailInput').placeholder = french ? 'vous@gmail.com' : 'you@gmail.com';
    document.querySelector('#googleBtn').innerHTML = '<span class="google-g">G</span> ' + (french ? 'Continuer avec Google' : 'Continue with Google') + ' <span>↗</span>';
    document.querySelector('#authNote').textContent = next === 'signup'
      ? (french ? 'Nous enverrons un lien de confirmation à votre Gmail avant d’activer votre compte.' : 'We’ll send a confirmation link to your Gmail before your account is activated.')
      : (french ? 'Utilisez l’adresse Gmail avec laquelle vous avez créé votre compte.' : 'Use the Gmail address you registered with.');
    if (feedback.dataset.kind === 'error' && feedback.textContent.includes('Supabase')) {
      feedback.textContent = french ? 'Ajoutez l’URL du projet Supabase et sa clé publique dans supabase-config.js.' : 'Add the Supabase project URL and publishable key to supabase-config.js first.';
    }
  }
  function openAuth(next = 'signup') {
    setMode(next);
    if (!dialog.open) dialog.showModal();
    window.setTimeout(() => (next === 'signup' ? nameInput : document.querySelector('#emailInput')).focus(), 50);
  }
  function humanizeError(error) {
    const message = error?.message || 'Something went wrong. Please try again.';
    const french = document.documentElement.dataset.language === 'fr';
    if (/invalid login credentials/i.test(message)) return french ? 'Adresse Gmail ou mot de passe incorrect.' : 'Incorrect Gmail address or password.';
    if (/email not confirmed/i.test(message)) return french ? 'Confirmez votre adresse e-mail depuis le lien reçu avant de vous connecter.' : 'Confirm your email using the link we sent before logging in.';
    if (/already registered|user already registered/i.test(message)) return french ? 'Un compte existe peut-être déjà. Essayez de vous connecter.' : 'An account may already exist. Try logging in instead.';
    if (/password should be at least|weak password/i.test(message)) return french ? 'Choisissez un mot de passe plus robuste (au moins 8 caractères).' : 'Choose a stronger password (at least 8 characters).';
    if (/rate limit|email rate limit/i.test(message)) return french ? 'Trop de demandes d’e-mail. Réessayez plus tard ou configurez un serveur SMTP.' : 'Too many email requests. Try again later or configure custom SMTP.';
    if (/email address.*invalid|invalid email/i.test(message)) return french ? 'Vérifiez votre adresse Gmail.' : 'Check your Gmail address.';
    return message;
  }

  document.querySelector('#loginBtn')?.addEventListener('click', async () => {
    if (!currentSession) return openAuth('login');
  });
  document.querySelector('#logoutBtn')?.addEventListener('click', async () => {
    if (!currentSession || !supabaseClient) return;
    const { error } = await supabaseClient.auth.signOut();
    if (error) setFeedback(humanizeError(error), 'error');
  });
  document.querySelector('#signupBtn')?.addEventListener('click', () => openAuth('signup'));
  document.querySelector('#authClose')?.addEventListener('click', () => dialog.close());
  modeSwitch.addEventListener('click', () => setMode(mode === 'signup' ? 'login' : 'signup'));
  document.querySelector('#googleBtn').addEventListener('click', async () => {
    if (!supabaseClient) return setFeedback('Add the Supabase project URL and publishable key to supabase-config.js first.', 'error');
    const callback = new URL(`${window.location.origin}${window.location.pathname}`);
    if (new URLSearchParams(window.location.search).get('returnTo') === 'profile.html') {
      callback.searchParams.set('auth', 'login');
      callback.searchParams.set('returnTo', 'profile.html');
    }
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google', options: { redirectTo: callback.toString() }
    });
    if (error) setFeedback(humanizeError(error), 'error');
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    clearFeedback();
    if (busy) return;
    if (!supabaseClient) return setFeedback('Add the Supabase project URL and publishable key to supabase-config.js first.', 'error');
    const email = document.querySelector('#emailInput').value.trim();
    const password = passwordInput.value;
    if (!/^[^\s@]+@gmail\.com$/i.test(email)) return setFeedback(document.documentElement.dataset.language === 'fr' ? 'Veuillez utiliser une adresse Gmail pour continuer.' : 'Please use a Gmail address to continue.', 'error');
    if (mode === 'signup' && password.length < 8) return setFeedback(document.documentElement.dataset.language === 'fr' ? 'Choisissez un mot de passe d’au moins 8 caractères.' : 'Choose a password with at least 8 characters.', 'error');
    busy = true;submit.disabled = true;submit.classList.add('is-loading');
    try {
      if (mode === 'signup') {
        const redirect = `${window.location.origin}${window.location.pathname}?auth=confirmed`;
        const { data, error } = await supabaseClient.auth.signUp({
          email, password,
          options: { emailRedirectTo: redirect, data: { display_name: nameInput.value.trim() } }
        });
        if (error) throw error;
        if (data.session) {
          await supabaseClient.auth.signOut();
          return setFeedback('Email confirmation is disabled in this Supabase project. Enable Confirm email in Authentication settings, then try again.', 'error');
        }
        setFeedback('Check your Gmail inbox and click the confirmation link to activate your account.', 'success');
        form.reset();nameInput.required = true;
      } else {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        currentSession = data.session;updateAuthUi();dialog.close();
        window.showToast?.('Welcome back to STC Learnit!');
      }
    } catch (error) { setFeedback(humanizeError(error), 'error'); }
    finally { busy = false;submit.disabled = false;submit.classList.remove('is-loading'); }
  });
  supabaseClient?.auth.onAuthStateChange((_event, session) => {
    currentSession = session;updateAuthUi();
    if (session && new URLSearchParams(window.location.search).get('returnTo') === 'profile.html') {
      window.location.replace('profile.html');
    }
  });
  supabaseClient?.auth.getSession().then(({ data }) => { currentSession = data.session;updateAuthUi(); });
  window.addEventListener('stc:language-change', () => { setMode(mode);updateAuthUi(); });

  if (new URLSearchParams(window.location.search).get('auth') === 'confirmed') {
    const french = document.documentElement.dataset.language === 'fr';
    window.setTimeout(() => window.showToast?.(french ? 'Votre e-mail est confirmé. Bienvenue sur STC Learnit !' : 'Your email is confirmed. Welcome to STC Learnit!'), 150);
    const cleanUrl = new URL(window.location.href);cleanUrl.searchParams.delete('auth');history.replaceState({}, '', cleanUrl);
  }
  updateAuthUi();
  if (new URLSearchParams(window.location.search).get('auth') === 'login') openAuth('login');
})();
