import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function update() {
  const { data, error } = await supabase
    .from('posts')
    .update({ status: 'published' })
    .match({ status: 'draft' }); // Update all drafts to published for the dummy data
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Updated successfully');
  }
}

update();
