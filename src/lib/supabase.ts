
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://inayvclensqkpxaquipk.supabase.co';
const supabaseKey = 'sb_publishable_Z8iB0eW4n2c9VRFMKGVo5g_DaO5K1Ox';

export const supabase = createClient(supabaseUrl, supabaseKey);
