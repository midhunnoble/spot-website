import * as fs from 'fs';
import * as path from 'path';

const dir = './src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Fix double replacements
  content = content.replace(/py-12 md:py-24 md:py-16 md:py-32/g, 'py-16 md:py-32');
  content = content.replace(/py-12 md:py-24 md:py-20 md:py-40/g, 'py-20 md:py-40');
  content = content.replace(/py-12 md:py-24 md:py-12 md:py-24/g, 'py-12 md:py-24');
  
  // Fix the grid replacements that were done incorrectly or need to be cleaned up
  content = content.replace(/flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 gap-8 md:gap-16/g, 'grid md:grid-cols-2 gap-8 md:gap-16'); // Revert the main WhatIsSpot grid
  
  fs.writeFileSync(path.join(dir, file), content);
});

console.log("Cleanup updated");
