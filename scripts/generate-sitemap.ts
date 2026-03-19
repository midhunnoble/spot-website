
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual env loading if ts-node/tsx doesn't automatically load from .env
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const baseUrl = 'https://spotmicroschool.in';

async function generate() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in env.');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  const staticPages = [
    '',
    '/about',
    '/philosophy',
    '/blog',
    '/events',
    '/studios',
    '/microschool',
    '/makerverse',
    '/inschool',
    '/projects',
    '/contact',
    '/privacy',
    '/terms'
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page}</loc>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += '  </url>\n';
  });

  try {
    // Dynamic Content
    const { data: posts } = await supabase.from('posts').select('slug');
    const { data: events } = await supabase.from('events').select('id');
    const { data: studios } = await supabase.from('studios').select('id');

    posts?.forEach(post => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    });

    events?.forEach(event => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/events/${event.id}</loc>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    });

    studios?.forEach(studio => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/studios/${studio.id}</loc>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    });
  } catch (e) {
    console.warn('Skipping dynamic pages due to Supabase error:', e);
  }

  xml += '</urlset>';
  
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('Sitemap generated successfully in public/sitemap.xml');
}

generate();
