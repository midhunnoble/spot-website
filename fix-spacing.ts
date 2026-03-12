import * as fs from 'fs';
import * as path from 'path';

const dir = './src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Padding
  content = content.replace(/\bpy-32\b/g, 'py-16 md:py-32');
  content = content.replace(/\bpy-40\b/g, 'py-20 md:py-40');
  content = content.replace(/\bpy-24\b/g, 'py-12 md:py-24');
  
  // Margins
  content = content.replace(/\bmb-20\b/g, 'mb-10 md:mb-20');
  content = content.replace(/\bmb-24\b/g, 'mb-12 md:mb-24');
  content = content.replace(/\bmb-16\b/g, 'mb-8 md:mb-16');
  
  // Gaps
  content = content.replace(/\bgap-16\b/g, 'gap-8 md:gap-16');
  content = content.replace(/\bgap-12\b/g, 'gap-6 md:gap-12');
  
  // Typography
  content = content.replace(/\btext-5xl md:text-7xl\b/g, 'text-4xl md:text-5xl lg:text-7xl');
  content = content.replace(/\btext-6xl md:text-8xl\b/g, 'text-5xl md:text-6xl lg:text-8xl');
  content = content.replace(/\btext-5xl md:text-6xl\b/g, 'text-4xl md:text-5xl lg:text-6xl');
  content = content.replace(/\btext-4xl md:text-5xl\b/g, 'text-3xl md:text-4xl lg:text-5xl');

  // Convert grids to horizontal scroll on mobile
  // We'll replace `grid md:grid-cols-2` with `flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2`
  // and we'll replace `grid sm:grid-cols-2` with `flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2`
  // and `grid lg:grid-cols-3` with `flex overflow-x-auto snap-x snap-mandatory pb-8 lg:grid lg:grid-cols-3`
  // Actually, regex replacement for grids is risky. Let's do it manually or via specific regex.
  
  content = content.replace(/className="grid md:grid-cols-2/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2');
  content = content.replace(/className="grid sm:grid-cols-2/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2');
  content = content.replace(/className="grid lg:grid-cols-3/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 lg:grid lg:grid-cols-3');
  content = content.replace(/className="grid lg:grid-cols-4/g, 'className="flex overflow-x-auto snap-x snap-mandatory pb-8 lg:grid lg:grid-cols-4');
  
  // Add min-w to children of these grids if they are mapped
  // e.g. `<motion.div \n              key={i}`
  // We can just add a global CSS class to handle this, or add it to the elements.
  
  fs.writeFileSync(path.join(dir, file), content);
});

console.log("Spacing updated");
