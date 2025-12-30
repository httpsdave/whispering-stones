import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase')) {
  throw new Error(
    '⚠️ Missing Supabase credentials!\n\n' +
    'Please follow these steps:\n' +
    '1. Go to https://supabase.com and create a free account\n' +
    '2. Create a new project\n' +
    '3. Go to Project Settings > API\n' +
    '4. Copy your Project URL and anon/public key\n' +
    '5. Update the .env.local file in your project root\n' +
    '6. Restart the dev server with: npm run dev\n\n' +
    'See README.md for detailed instructions.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
