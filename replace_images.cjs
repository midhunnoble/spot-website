const fs = require('fs');
const path = require('path');

const replacements = {
  '1585468273280-7c6536979201': '1576086213369-97a306d36557', // Science / Microschool
  '1588072432836-e10032774350': '1573164713988-8665fc963095', // Art / After School
  '1464226184884-fa280b87c399': '1528319725582-ddc096101511'  // Terrarium
};

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldId, newId] of Object.entries(replacements)) {
        if (content.includes(oldId)) {
          content = content.split(oldId).join(newId);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  });
}

walk('./src');
