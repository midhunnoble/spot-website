import * as fs from 'fs';
import * as path from 'path';

const dir = './src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Fix template literal classes
  content = content.replace(/className=\{`\$\{item\.color\} p-8/g, 'className={`min-w-[85vw] md:min-w-0 snap-center ${item.color} p-8');
  content = content.replace(/className=\{`\$\{feat\.color\} p-8/g, 'className={`min-w-[85vw] md:min-w-0 snap-center ${feat.color} p-8');
  content = content.replace(/className=\{`\$\{pillar\.color\} \$\{pillar\.textColor \|\| 'text-spot-charcoal'\} p-8/g, 'className={`min-w-[85vw] md:min-w-0 snap-center ${pillar.color} ${pillar.textColor || \'text-spot-charcoal\'} p-8');
  
  fs.writeFileSync(path.join(dir, file), content);
});

console.log("Children updated");
