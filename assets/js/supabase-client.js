/* LensRift Supabase client. Safe when unconfigured: site falls back to assets/data/media.json.
   Fill SUPABASE_URL + SUPABASE_ANON_KEY from Supabase Dashboard > Project Settings > API.
   The anon key is PUBLIC by design (RLS restricts writes). Never put service_role here. */
(function () {
  var SUPABASE_URL = '';      // e.g. 'https://xyzcompany.supabase.co'
  var SUPABASE_ANON_KEY = ''; // e.g. 'eyJhbGciOi...'

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !window.supabase) return;
  try {
    window.LENSRIFT_DB = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) { console.warn('Supabase client skipped:', e.message); }
})();
