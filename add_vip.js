import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('src', 'data', 'platforms.json');
const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Filter out old ones if they exist to prevent duplicates
const filteredData = currentData.filter(p => !p.name.includes('Pearl Talent') && !p.name.includes('Outsourcing Angel'));

const vips = [
  {
    id: "pearl-talent",
    name: "Pearl Talent",
    url: "https://www.pearltalent.com/for-candidates",
    category: "Virtual Assistants & Support",
    type: "Work",
    description: "Specialized recruitment for high-end Filipino virtual assistants and professional talent.",
    tags: ["Premium Staffing", "Top VA Talent"],
    aiExposure: "Low",
    isPlacementAgency: true
  },
  {
    id: "outsourcing-angel",
    name: "Outsourcing Angel",
    url: "https://jobs.outsourcingangel.com/",
    category: "Virtual Assistants & Support",
    type: "Work",
    description: "Ethical outsourcing agency focused on long-term relationships between businesses and Filipino virtual assistants.",
    tags: ["Ethical Outsourcing", "Long-term"],
    aiExposure: "Low",
    isPlacementAgency: true
  }
];

// Prepend to array
filteredData.unshift(...vips);

fs.writeFileSync(dataPath, JSON.stringify(filteredData, null, 2), 'utf8');
console.log('Successfully prepended Pearl Talent and Outsourcing Angel!');
