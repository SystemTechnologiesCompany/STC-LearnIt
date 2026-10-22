(() => {
  const config = window.STC_SUPABASE_CONFIG || {};
  const client = window.stcSupabase || (window.supabase?.createClient && config.url && config.publishableKey
    ? window.supabase.createClient(config.url, config.publishableKey, { auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true } })
    : null);
  if (!client) return;
  window.stcSupabase = client;

  function apply(plan, savedTheme = 'galaxy') {
    const root = document.documentElement;
    const membership = plan === 'pro' || plan === 'stc' ? plan : null;
    const previousTheme = root.dataset.premiumTheme || 'basic';
    const previousMembership = root.dataset.membership;
    const nextTheme = membership === 'pro' ? 'sakura' : membership === 'stc' ? ['basic', 'sakura', 'galaxy'].includes(savedTheme) ? savedTheme : 'galaxy' : 'basic';
    if (previousMembership && (previousTheme !== nextTheme || previousMembership !== membership)) {
      root.classList.add('theme-transitioning');
      clearTimeout(window.stcThemeTransitionTimer);
      window.stcThemeTransitionTimer = setTimeout(() => root.classList.remove('theme-transitioning'), 720);
    }
    if (membership) {
      root.dataset.membership = membership;
      const theme = membership === 'pro' ? 'sakura' : ['basic', 'sakura', 'galaxy'].includes(savedTheme) ? savedTheme : 'galaxy';
      if (theme === 'basic') delete root.dataset.premiumTheme;
      else root.dataset.premiumTheme = theme;
      setSakuraPetals(theme === 'sakura');
      window.dispatchEvent(new CustomEvent('stc:membership-theme-ready', { detail: { membership, theme } }));
    } else {
      delete document.documentElement.dataset.premiumTheme;
      delete document.documentElement.dataset.membership;
      setSakuraPetals(false);
      window.dispatchEvent(new CustomEvent('stc:membership-theme-ready', { detail: { membership: null, theme: 'basic' } }));
    }
  }
  function setSakuraPetals(enabled) {
    let layer = document.querySelector('.sakura-petals');
    if (!enabled) { layer?.remove(); return; }
    if (layer) return;
    layer = document.createElement('div');
    layer.className = 'sakura-petals';
    layer.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 12; i++) {
      const petal = document.createElement('span');
      petal.textContent = i % 3 === 0 ? '🌸' : '✿';
      petal.style.setProperty('--petal-x', `${(i * 37 + 6) % 100}%`);
      petal.style.setProperty('--petal-delay', `${(i % 6) * -2.7}s`);
      petal.style.setProperty('--petal-duration', `${15 + (i % 5) * 2.4}s`);
      petal.style.setProperty('--petal-size', `${12 + (i % 4) * 4}px`);
      layer.appendChild(petal);
    }
    document.body.appendChild(layer);
  }
  async function refresh(session) {
    if (!session?.user?.id) { apply(null); return; }
    const { data, error } = await client.from('premium_subscriptions')
      .select('plan,expires_at').eq('user_id', session.user.id).maybeSingle();
    if (error) { console.warn('Could not check STC Learnit membership. Apply premium-codes.sql in Supabase.', error); apply(null); return; }
    apply(data && Date.parse(data.expires_at) > Date.now() ? data.plan : null, session.user.user_metadata?.stc_theme || 'galaxy');
  }

  client.auth.getSession().then(({ data }) => refresh(data?.session));
  client.auth.onAuthStateChange((_event, session) => { queueMicrotask(() => refresh(session)); });
  window.addEventListener('stc:membership-change', async event => {
    const { data } = await client.auth.getSession();
    apply(event.detail?.plan, data?.session?.user?.user_metadata?.stc_theme || 'galaxy');
  });
  window.addEventListener('stc:membership-theme-change', event => apply('stc', event.detail?.theme || 'galaxy'));
})();
