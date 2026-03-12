import * as fs from 'fs';
import * as path from 'path';

const dir = './src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Fix missed grids
  content = content.replace(/className="grid md:grid-cols-3 gap-8"/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-3 gap-8 hide-scrollbar"');
  content = content.replace(/className="grid md:grid-cols-2 gap-8"/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 gap-8 hide-scrollbar"');
  content = content.replace(/className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 hide-scrollbar"');
  
  // Add min-w to children of these grids
  content = content.replace(/className="`\$\{prog\.color\} rounded-3xl/g, 'className={`min-w-[85vw] md:min-w-0 snap-center ${prog.color} rounded-3xl');
  content = content.replace(/className="bg-white p-8 rounded-3xl/g, 'className="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 rounded-3xl');
  content = content.replace(/className="bg-spot-cream p-8 rounded-3xl/g, 'className="min-w-[85vw] md:min-w-0 snap-center bg-spot-cream p-8 rounded-3xl');
  
  fs.writeFileSync(path.join(dir, file), content);
});

console.log("Missed grids updated");
