(() => {
  const config = window.STC_SUPABASE_CONFIG || {};
  const client = window.stcSupabase || (window.supabase?.createClient && config.url && config.publishableKey
    ? window.supabase.createClient(config.url, config.publishableKey, { auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true } })
    : null);
  if (!client) return;
  window.stcSupabase = client;

  function apply(plan) {
    const active = plan === 'pro' || plan === 'stc';
    if (active) {
      document.documentElement.dataset.premiumTheme = 'galaxy';
      document.documentElement.dataset.membership = plan;
    } else {
      delete document.documentElement.dataset.premiumTheme;
      delete document.documentElement.dataset.membership;
    }
  }
  async function refresh(session) {
    if (!session?.user?.id) { apply(null); return; }
    const { data, error } = await client.from('premium_subscriptions')
      .select('plan,expires_at').eq('user_id', session.user.id).maybeSingle();
    if (error) { console.warn('Could not check STC Learnit membership. Apply premium-codes.sql in Supabase.', error); apply(null); return; }
    apply(data && Date.parse(data.expires_at) > Date.now() ? data.plan : null);
  }

  client.auth.getSession().then(({ data }) => refresh(data?.session));
  client.auth.onAuthStateChange((_event, session) => { queueMicrotask(() => refresh(session)); });
  window.addEventListener('stc:membership-change', event => apply(event.detail?.plan));
})();
