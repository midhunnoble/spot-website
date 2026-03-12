import * as fs from 'fs';
import * as path from 'path';

const dir = './src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Replace grids with horizontal scroll containers
  // We want to replace `<div className="grid grid-cols-2 gap-6">` with `<div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 gap-6 hide-scrollbar">`
  // and we need to add `min-w-[85vw] md:min-w-0 snap-center` to the children.
  
  // Since regex is hard for this, let's do targeted replacements for the specific grid classes.
  
  // 1. `grid grid-cols-2 gap-6` -> `flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 gap-6 hide-scrollbar`
  content = content.replace(/className="grid grid-cols-2 gap-6"/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 gap-6 hide-scrollbar"');
  
  // 2. `grid md:grid-cols-2 lg:grid-cols-3 gap-6` -> `flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 hide-scrollbar`
  content = content.replace(/className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 hide-scrollbar"');
  
  // 3. `grid md:grid-cols-2 lg:grid-cols-4 gap-6` -> `flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 hide-scrollbar`
  content = content.replace(/className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 hide-scrollbar"');
  
  // 4. `grid sm:grid-cols-2 gap-6` -> `flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2 gap-6 hide-scrollbar`
  content = content.replace(/className="grid sm:grid-cols-2 gap-6"/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2 gap-6 hide-scrollbar"');

  // 5. `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` -> `flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 hide-scrollbar`
  content = content.replace(/className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 hide-scrollbar"');

  // 6. `grid md:grid-cols-3 gap-6` -> `flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-3 gap-6 hide-scrollbar`
  content = content.replace(/className="grid md:grid-cols-3 gap-6"/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-3 gap-6 hide-scrollbar"');
  
  // 7. `grid sm:grid-cols-2 lg:grid-cols-3 gap-6` -> `flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 hide-scrollbar`
  content = content.replace(/className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 hide-scrollbar"');

  // 8. `grid grid-cols-2 md:grid-cols-4 gap-8` -> `grid grid-cols-2 md:grid-cols-4 gap-8` (Impact section, keep as grid)
  
  // Now we need to add `min-w-[85vw] md:min-w-0 snap-center` to the children of these grids.
  // The children usually have `className="... p-8 rounded-3xl ..."` or `className="bg-white p-8 ..."`
  // Let's just add `min-w-[85vw] md:min-w-0 snap-center` to all `bg-white p-8` or `bg-spot-cream p-8` or `group relative rounded-[2rem]`
  
  content = content.replace(/className="bg-white p-8/g, 'className="min-w-[85vw] md:min-w-0 snap-center bg-white p-8');
  content = content.replace(/className="bg-spot-cream p-8/g, 'className="min-w-[85vw] md:min-w-0 snap-center bg-spot-cream p-8');
  content = content.replace(/className="group relative rounded-\[2rem\]/g, 'className="min-w-[85vw] md:min-w-0 snap-center group relative rounded-[2rem]');
  content = content.replace(/className="\${item\.color} p-8/g, 'className={`min-w-[85vw] md:min-w-0 snap-center ${item.color} p-8');
  content = content.replace(/className="\${feat\.color} p-8/g, 'className={`min-w-[85vw] md:min-w-0 snap-center ${feat.color} p-8');
  content = content.replace(/className="\${pillar\.color} \${pillar\.textColor \|\| 'text-spot-charcoal'} p-8/g, 'className={`min-w-[85vw] md:min-w-0 snap-center ${pillar.color} ${pillar.textColor || \'text-spot-charcoal\'} p-8');
  content = content.replace(/className="bg-white\/5 border border-white\/10 p-8/g, 'className="min-w-[85vw] md:min-w-0 snap-center bg-white/5 border border-white/10 p-8');
  content = content.replace(/className="group block bg-white rounded-\[2rem\]/g, 'className="min-w-[85vw] md:min-w-0 snap-center group block bg-white rounded-[2rem]');
  content = content.replace(/className="group relative bg-spot-charcoal rounded-\[2rem\]/g, 'className="min-w-[85vw] md:min-w-0 snap-center group relative bg-spot-charcoal rounded-[2rem]');
  content = content.replace(/className="bg-white p-8 md:p-12 rounded-\[3rem\]/g, 'className="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 md:p-12 rounded-[3rem]');
  content = content.replace(/className="bg-spot-charcoal text-spot-cream p-8 md:p-12 rounded-\[3rem\]/g, 'className="min-w-[85vw] md:min-w-0 snap-center bg-spot-charcoal text-spot-cream p-8 md:p-12 rounded-[3rem]');
  
  fs.writeFileSync(path.join(dir, file), content);
});

console.log("Grids updated");
