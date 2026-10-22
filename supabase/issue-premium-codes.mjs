import { createHash, randomBytes } from 'node:crypto';

const [, , rawPlan, rawCount = '1'] = process.argv;
const plan = String(rawPlan || '').toLowerCase();
const count = Number(rawCount);
if (!['pro', 'stc'].includes(plan) || !Number.isInteger(count) || count < 1 || count > 500) {
  console.error('Usage: node supabase/issue-premium-codes.mjs <pro|stc> [count 1-500]');
  process.exit(1);
}

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // avoids ambiguous I, O, 0 and 1
for (let index = 0; index < count; index += 1) {
  const compact = [...randomBytes(16)].map(byte => alphabet[byte & 31]).join('');
  const code = compact.match(/.{4}/g).join('-');
  const codeHash = createHash('sha256').update(compact, 'utf8').digest('hex');
  console.log(`${String(index + 1).padStart(3, '0')}  ${plan.toUpperCase()}  ${code}`);
  console.log(`insert into public.premium_codes (code_hash, plan) values ('${codeHash}', '${plan}');`);
}
