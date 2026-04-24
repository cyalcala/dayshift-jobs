import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('src', 'data', 'platforms.json');
const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const giants = [
  {
    "id": "upwork",
    "name": "Upwork",
    "url": "https://upwork.com",
    "category": "Freelance Marketplaces",
    "type": "Work",
    "description": "The world's largest work marketplace connecting independent talent directly with massive global clients.",
    "tags": ["Largest Market", "Global", "All Fields"],
    "aiExposure": "Medium"
  },
  {
    "id": "fiverr",
    "name": "Fiverr",
    "url": "https://fiverr.com",
    "category": "Freelance Marketplaces",
    "type": "Work",
    "description": "Massive global marketplace prioritizing rigid gig packages and highly competitive creative bidding.",
    "tags": ["Gig Based", "Global", "Creative"],
    "aiExposure": "High"
  },
  {
    "id": "freelancer",
    "name": "Freelancer.com",
    "url": "https://freelancer.com",
    "category": "Freelance Marketplaces",
    "type": "Work",
    "description": "A massive, traditional bidding marketplace with millions of smaller clients scaling globally.",
    "tags": ["Bidding Wars", "Global"],
    "aiExposure": "Medium"
  },
  {
    "id": "toptal",
    "name": "Toptal",
    "url": "https://toptal.com",
    "category": "Freelance Marketplaces",
    "type": "Work",
    "description": "Extremely rigorous vetting platform claiming the 'top 3%' of freelance developer and finance talent.",
    "tags": ["Top 3%", "Vetted", "Premium"],
    "aiExposure": "Low"
  },
  {
    "id": "peopleperhour",
    "name": "PeoplePerHour",
    "url": "https://peopleperhour.com",
    "category": "Freelance Marketplaces",
    "type": "Work",
    "description": "UK-based global marketplace specializing in rigid project gigs and small business connections.",
    "tags": ["UK Based", "Gigs"],
    "aiExposure": "Medium"
  },
  {
    "id": "guru",
    "name": "Guru",
    "url": "https://guru.com",
    "category": "Freelance Marketplaces",
    "type": "Work",
    "description": "One of the oldest centralized freelance platforms heavily catering to agencies and enterprises.",
    "tags": ["Enterprise", "Oldest"],
    "aiExposure": "Medium"
  },
  {
    "id": "braintrust",
    "name": "Braintrust",
    "url": "https://usebraintrust.com",
    "category": "Freelance Marketplaces",
    "type": "Work",
    "description": "A decentralized, user-owned talent network bypassing massive marketplace fees for freelancers.",
    "tags": ["Decentralized", "Zero Fees"],
    "aiExposure": "Low"
  },
  {
    "id": "malt",
    "name": "Malt",
    "url": "https://malt.com",
    "category": "Freelance Marketplaces",
    "type": "Work",
    "description": "A rapidly expanding European marketplace replacing intermediaries to connect companies directly with local/remote consultants.",
    "tags": ["European", "Consulting"],
    "aiExposure": "Low"
  },
  {
    "id": "solidgigs",
    "name": "SolidGigs",
    "url": "https://solidgigs.com",
    "category": "Freelance Marketplaces",
    "type": "Work",
    "description": "Curates the top 1% of freelance jobs from dozens of platforms and sends them directly to you for a flat fee.",
    "tags": ["Curated Gigs", "Flat Fee"],
    "aiExposure": "Medium"
  },
  {
    "id": "contra",
    "name": "Contra",
    "url": "https://contra.com",
    "category": "Freelance Marketplaces",
    "type": "Work",
    "description": "A stunning, commission-free independent network heavily focusing on modern tech and creative talent.",
    "tags": ["Commission-Free", "Gen Z"],
    "aiExposure": "Low"
  }
];

currentData.push(...giants);

fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2), 'utf8');
console.log('Successfully appended 10 Freelance Marketplaces!');
