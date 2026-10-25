-- One-time 3-day testing batch. Redeem each code within 3 days after running this file.
-- The associated Pro or STC plan then remains active for 3 days after redemption.
-- Plain-text activation codes are shared separately; only their SHA-256 hashes are stored here.
-- Run supabase/premium-codes.sql first so premium_codes.duration_days exists.

insert into public.premium_codes (code_hash, plan, duration_days, valid_until)
values
  ('6a2e281670eb738bded5886d5c78864d02c9b2063fe0197264b73a90b19992d0', 'pro', 3, now() + interval '3 days'),
  ('8ae0d1df8f518accce329a5501650a76c313a280c77023ead288e60cd00e22c1', 'pro', 3, now() + interval '3 days'),
  ('6994ee0024e9ed536e331c97d5400c5303a58f31dc02f685983a22f9d9f87a3d', 'pro', 3, now() + interval '3 days'),
  ('d814cc1ed55e07eb57ed782169fe6aeae50af4c25df795bb78b9bef1c9651c19', 'pro', 3, now() + interval '3 days'),
  ('8d978dc64dcc74e06fe910eafdc922ad577e1d50d43f57f22bf80b2ef50a69ea', 'pro', 3, now() + interval '3 days'),
  ('f7003fc19004801e98fbc1b79e468d82c8a0935664e0286cdc29a8f0846ff935', 'pro', 3, now() + interval '3 days'),
  ('f5aabf8b130cab3d5abf2061e284df232348796881988987d6c5ff4cd15b7b1f', 'pro', 3, now() + interval '3 days'),
  ('7f8ff5b808d0eec6a713ba994c48495aa3d119b5ace3e9972676dce0ee933b6a', 'pro', 3, now() + interval '3 days'),
  ('779c3c99f7ea0c31b379204715fd4bdc64692cf9b9b97684d35c66931ab7e9cb', 'pro', 3, now() + interval '3 days'),
  ('5a1083cea7816c829c56811c1412a1406789ca2f6d637ef0c95d66a54841d94b', 'pro', 3, now() + interval '3 days'),
  ('e803bb52ee4fa993bdd08f3196a4f196dafd654c2f96e99a5622160fcdeb5138', 'stc', 3, now() + interval '3 days'),
  ('bb341850d34447f40fa7f548be9ea6b2260043b7af6f4f1d5182a642c7d96e2f', 'stc', 3, now() + interval '3 days'),
  ('253b1af121ad08f584fc6395698a0ef555c0a3a56a497b6cdfbd54ebbc19b15a', 'stc', 3, now() + interval '3 days'),
  ('932a51954caba10fa8ce3d68d22fd9d62cc110c930aa17a174cefc1441cbbb0f', 'stc', 3, now() + interval '3 days'),
  ('97143177a1168e0adc3431aba04355eae84094f08316cd02c169424e2cc25a18', 'stc', 3, now() + interval '3 days'),
  ('84d23ceab6ed5d96e88a305231d405d7c2b76fb7e2a71a148751647e54bccdf4', 'stc', 3, now() + interval '3 days'),
  ('1eca2698d5246da6a33310ff14e8f12deb3abc16dd3a589254dea6cd23861f61', 'stc', 3, now() + interval '3 days'),
  ('9942db399fbe95524faeb07944fcfa71c2a3f20db10be4bd08b325770711cdd3', 'stc', 3, now() + interval '3 days'),
  ('fe44dee4e538049a3effea3e01f0950560f7a49fa5d31b5bc89b60f4069ad339', 'stc', 3, now() + interval '3 days'),
  ('0ef52db579e17606738d52bf95ec92224f33fd7287c3dea065208be256e04c0b', 'stc', 3, now() + interval '3 days')
on conflict (code_hash) do nothing;
