import https from 'https';
import fs from 'fs';

const files = ['src/pages/Home.tsx', 'src/pages/About.tsx', 'src/pages/Studios.tsx', 'src/pages/Projects.tsx', 'src/pages/ProjectDetail.tsx', 'src/pages/Careers.tsx'];

const urls = new Set();
files.forEach(f => {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    const matches = content.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
    if (matches) matches.forEach(m => urls.add(m));
  }
});

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', () => resolve({ url, status: 'error' }));
  });
};

async function run() {
  for (let url of urls) {
    const res = await checkUrl(url);
    if (res.status !== 200) {
      console.log(res.url, res.status);
    }
  }
}
run();
