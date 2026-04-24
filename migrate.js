import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('src', 'data', 'platforms.json');
const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const mappedData = currentData.map(p => {
  if (p.category === "Non-Tech / Support / VA") {
    p.category = "Virtual Assistants & Support";
  } else if (p.category === "General Job Boards") {
    p.category = "Global Remote Boards";
  } else if (p.category === "Writing & Creative") {
    if (['dribbble', 'behancejobs', 'coroflot', 'artstation', 'krop'].includes(p.id)) {
      p.category = "Design & UX";
    } else {
      p.category = "Copywriting & Editing";
    }
  }
  return p;
});

fs.writeFileSync(dataPath, JSON.stringify(mappedData, null, 2), 'utf8');
console.log('Migration complete!');
