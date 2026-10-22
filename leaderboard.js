(() => {
  const menu = document.querySelector('#leaderMenuToggle');
  menu?.addEventListener('click', () => document.querySelector('.main-nav')?.classList.toggle('open'));
  document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.main-nav')?.classList.remove('open')));

  const config = window.STC_SUPABASE_CONFIG || {};
  const client = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(config.url || '') &&
    typeof config.publishableKey === 'string' && config.publishableKey.startsWith('sb_publishable_') &&
    window.supabase?.createClient
    ? window.supabase.createClient(config.url, config.publishableKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
    : null;

  const filters = [...document.querySelectorAll('.leader-filter')];
  const rowsElement = document.querySelector('#leaderRows');
  const emptyElement = document.querySelector('#leaderEmpty');
  const statusElement = document.querySelector('#tournamentStatus');
  const periodBadge = document.querySelector('.ranking-period');
  const description = document.querySelector('#rankingDescription');
  const places = {
    1: document.querySelector('.podium-place.first'),
    2: document.querySelector('.podium-place.second'),
    3: document.querySelector('.podium-place.third')
  };
  let selectedPeriod = 'all';
  let refreshing = false;
  let roundEndsAt = null;
  let liveRows = [];
  let weeklyRows = [];
  let allRows = [];
  let lastRoundRows = [];
  let lang = (() => { try { return localStorage.getItem('stc-learnit-language') === 'fr' ? 'fr' : 'en'; } catch { return 'en'; } })();

  const words = {
    en: { all: 'ALL TIME', week: 'THIS WEEK', tournament: 'LIVE TOURNAMENT', allDescription: 'Sorted by total experience points', weekDescription: 'XP earned this week', tournamentDescription: 'Live XP earned in this four-day round', loading: 'Loading live standings…', round: 'Tournament ends in', d: 'd', h: 'h', m: 'm', eligible: 'Students with a completed course step and at least 10 XP are ranked.', empty: 'No eligible learners yet. Complete a course step and earn at least 10 XP to appear here.', failed: 'Rankings could not load. Run supabase/leaderboard.sql in your Supabase SQL Editor, then refresh.', offline: 'Leaderboard data is unavailable. Check your connection and try again.', place: ['1st place', '2nd place', '3rd place'], xp: 'XP' },
    fr: { all: 'TOUS LES TEMPS', week: 'CETTE SEMAINE', tournament: 'TOURNOI EN DIRECT', allDescription: 'Tri par total de points d’expérience', weekDescription: 'XP gagnés cette semaine', tournamentDescription: 'XP gagnés en direct durant ce tournoi de quatre jours', loading: 'Chargement du classement en direct…', round: 'Fin du tournoi dans', d: 'j', h: 'h', m: 'min', eligible: 'Les étudiants ayant terminé une étape et gagné au moins 10 XP sont classés.', empty: 'Aucun étudiant admissible pour le moment. Terminez une étape et gagnez au moins 10 XP.', failed: 'Le classement ne se charge pas. Exécutez supabase/leaderboard.sql dans l’éditeur SQL Supabase, puis actualisez.', offline: 'Classement indisponible. Vérifiez votre connexion et réessayez.', place: ['1re place', '2e place', '3e place'], xp: 'XP' }
  };

  function t(key) { return words[lang][key]; }
  function safeText(value, fallback = '') { return String(value || fallback).replace(/[<>]/g, ''); }
  function initials(name) { return safeText(name, '?').trim().split(/\s+/).slice(0, 2).map(part => part.charAt(0)).join('').toUpperCase() || '?'; }
  function formatXp(value) { return `${Number(value || 0).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')} ${t('xp')}`; }

  function paintAvatar(avatar, person, displayName) {
    avatar.classList.remove('has-photo');
    avatar.replaceChildren();
    avatar.textContent = initials(displayName);
    if (!person.avatar_url || !/^https:\/\//i.test(person.avatar_url)) return;
    const image = document.createElement('img');
    image.alt = `${displayName} profile picture`;
    image.loading = 'lazy';
    image.referrerPolicy = 'no-referrer';
    image.addEventListener('error', () => {
      avatar.classList.remove('has-photo');
      image.remove();
      avatar.textContent = initials(displayName);
    }, { once: true });
    avatar.classList.add('has-photo');
    avatar.textContent = '';
    avatar.appendChild(image);
    image.src = person.avatar_url;
  }

  function paintPodium(entries) {
    for (const rank of [1, 2, 3]) {
      const card = places[rank];
      if (!card) continue;
      const person = entries.find(row => Number(row.place) === rank) || entries[rank - 1];
      const avatar = card.querySelector('.podium-avatar');
      const name = card.querySelector('.podium-name');
      const score = card.querySelector('.podium-xp');
      if (!person) {
        avatar.classList.remove('has-photo');
        avatar.replaceChildren();
        avatar.textContent = String(rank);
        name.textContent = t('place')[rank - 1];
        score.textContent = '— XP';
        card.classList.add('is-empty');
        continue;
      }
      const displayName = safeText(person.display_name, person.username || 'STC Learner');
      name.textContent = displayName;
      name.title = displayName;
      score.textContent = formatXp(person.xp);
      paintAvatar(avatar, person, displayName);
      card.classList.remove('is-empty');
    }
  }

  function paintRows(entries) {
    rowsElement.replaceChildren();
    for (const person of entries) {
      const row = document.createElement('div');
      row.className = 'leader-row';
      const rank = document.createElement('span');
      rank.className = 'leader-rank';
      rank.textContent = String(person.place);
      const student = document.createElement('span');
      student.className = 'leader-person';
      const avatar = document.createElement('span');
      avatar.className = 'leader-avatar';
      const name = document.createElement('span');
      name.textContent = safeText(person.display_name, person.username || 'STC Learner');
      paintAvatar(avatar, person, name.textContent);
      student.append(avatar, name);
      const faculty = document.createElement('span');
      faculty.className = 'leader-faculty';
      faculty.textContent = safeText(person.faculty, '—');
      const xp = document.createElement('span');
      xp.className = 'leader-xp';
      xp.textContent = formatXp(person.xp);
      row.append(rank, student, faculty, xp);
      rowsElement.append(row);
    }
    emptyElement.hidden = entries.length > 0;
  }

  function render() {
    const entries = selectedPeriod === 'all' ? allRows : selectedPeriod === 'week' ? weeklyRows : liveRows;
    filters.forEach(button => {
      const active = button.dataset.period === selectedPeriod;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    periodBadge.textContent = t(selectedPeriod);
    description.textContent = t(`${selectedPeriod}Description`);
    paintRows(entries);
    // Keep the tournament podium fixed on the most recently completed four-day round.
    // Before the first round finishes, show the live leaders so the podium is useful immediately.
    paintPodium(selectedPeriod === 'tournament' ? (lastRoundRows.length ? lastRoundRows : liveRows) : entries);
  }

  function updateCountdown() {
    if (!roundEndsAt || !statusElement) return;
    const remaining = Math.max(0, new Date(roundEndsAt).getTime() - Date.now());
    const totalMinutes = Math.floor(remaining / 60000);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    statusElement.textContent = `${t('round')} ${days}${t('d')} ${hours}${t('h')} ${minutes}${t('m')} · ${t('eligible')}`;
  }

  async function refresh() {
    if (!client || refreshing || document.visibilityState === 'hidden') return;
    refreshing = true;
    try {
      const { data, error } = await client.rpc('get_leaderboard_snapshot');
      if (error) throw error;
      const snapshot = data || {};
      allRows = snapshot.all || [];
      weeklyRows = snapshot.week || [];
      liveRows = snapshot.tournament || [];
      lastRoundRows = snapshot.last_tournament || [];
      roundEndsAt = snapshot.round_end || null;
      statusElement.dataset.state = 'live';
      updateCountdown();
      render();
    } catch (error) {
      console.error('STC Learnit leaderboard:', error);
      statusElement.dataset.state = 'error';
      statusElement.textContent = error?.code === 'PGRST202' || error?.code === '42883' ? t('failed') : t('offline');
      if (!rowsElement.children.length) emptyElement.hidden = false;
    } finally {
      refreshing = false;
    }
  }

  filters.forEach(button => button.addEventListener('click', () => {
    selectedPeriod = button.dataset.period;
    render();
  }));
  window.addEventListener('focus', refresh);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') refresh(); });
  window.addEventListener('stc:language-change', event => {
    lang = event.detail?.language === 'fr' ? 'fr' : 'en';
    refresh();
  });

  if (!client) {
    statusElement.textContent = t('offline');
    emptyElement.hidden = false;
  } else {
    refresh();
    window.setInterval(refresh, 15000);
    window.setInterval(updateCountdown, 30000);
  }
})();
