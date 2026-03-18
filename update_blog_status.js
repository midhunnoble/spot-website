
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function updatePosts() {
  console.log('Fetching draft posts...');
  const { data: drafts, error: fetchError } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'draft');

  if (fetchError) {
    console.error('Error fetching posts:', fetchError);
    return;
  }

  console.log(`Found ${drafts.length} draft posts.`);

  if (drafts.length > 0) {
    const { data: updated, error: updateError } = await supabase
      .from('posts')
      .update({ status: 'published' })
      .in('id', drafts.map(d => d.id))
      .select();

    if (updateError) {
      console.error('Error updating posts:', updateError);
    } else {
      console.log('Successfully updated posts to published:', updated.length);
    }
  } else {
    console.log('No draft posts found to update.');
  }

  // Final check
  const { data: final, error: finalError } = await supabase
    .from('posts')
    .select('id, title, status');
  
  if (finalError) console.error(finalError);
  else console.log('Current posts in database:', final);
}

updatePosts();
