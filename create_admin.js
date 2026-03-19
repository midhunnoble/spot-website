import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@gmail.com',
    password: 'spotadmin123',
  });

  if (error) {
    console.error('Error signing up admin:', error.message);
  } else {
    console.log('Admin user created successfully!');
    console.log('Email: admin@spot.com');
    console.log('Password: spotadmin123');
    console.log('Note: If email confirmations are enabled in your Supabase project, you may need to confirm the email or manually verify the user in the Supabase dashboard.');
  }
}

main();
