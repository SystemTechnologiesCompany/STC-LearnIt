const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};
const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async request => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const authorization = request.headers.get('Authorization') || '';
  const publishableKey = request.headers.get('apikey') || '';
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  if (!authorization.startsWith('Bearer ') || !publishableKey || !supabaseUrl) {
    return json({ error: 'Sign in before redeeming a plan code.', reason: 'SIGN_IN_REQUIRED' }, 401);
  }

  try {
    const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { Authorization: authorization, apikey: publishableKey },
    });
    if (!authResponse.ok) return json({ error: 'Sign in before redeeming a plan code.', reason: 'SIGN_IN_REQUIRED' }, 401);

    let body: { code?: unknown };
    try { body = await request.json(); }
    catch { return json({ error: 'Enter a valid plan code.', reason: 'INVALID_CODE' }, 400); }

    if (typeof body.code !== 'string') return json({ error: 'Enter a valid plan code.', reason: 'INVALID_CODE' }, 400);
    const normalizedCode = body.code.toUpperCase().replace(/[\s-]/g, '');
    if (!/^[A-Z0-9]{12,24}$/.test(normalizedCode)) {
      return json({ error: 'That code is invalid, expired, or already used.', reason: 'INVALID_CODE' }, 400);
    }

    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalizedCode));
    const codeHash = toHex(new Uint8Array(digest));
    const redeemResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/redeem_premium_code`, {
      method: 'POST',
      headers: {
        Authorization: authorization,
        apikey: publishableKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_code_hash: codeHash }),
    });
    if (!redeemResponse.ok) {
      const rpcError = await redeemResponse.text();
      console.error('Premium redemption RPC returned HTTP', redeemResponse.status, rpcError.slice(0, 1200));
      return json({ error: 'Code redemption is temporarily unavailable.', reason: 'SERVICE_UNAVAILABLE' }, 503);
    }

    const rpcResult = await redeemResponse.json();
    const result = Array.isArray(rpcResult) ? rpcResult[0] : rpcResult;
    if (!result?.activated) {
      const reason = result?.reason === 'RATE_LIMITED' ? 'RATE_LIMITED' : 'INVALID_CODE';
      return json({ error: reason === 'RATE_LIMITED' ? 'Too many attempts. Please wait and try again.' : 'That code is invalid, expired, or already used.', reason }, reason === 'RATE_LIMITED' ? 429 : 400);
    }
    return json({ activated: true, plan: result.plan, expiresAt: result.expires_at });
  } catch (error) {
    console.error('Premium code redemption failed:', error);
    return json({ error: 'Code redemption is temporarily unavailable.', reason: 'SERVICE_UNAVAILABLE' }, 503);
  }
});
