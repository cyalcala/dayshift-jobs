import fs from 'fs';
import path from 'path';

const csvData = `edX,University-Grade,https://www.edx.org,"Business, humanities, professional certificates",Audit Free / Certificate Paid,Yes (Paid)
Coursera,University-Grade,https://www.coursera.org,"Career switching, accredited learning",Audit Free / Certificate Paid,Yes (Paid)
MIT OpenCourseWare,University-Grade,https://ocw.mit.edu,Self-directed rigorous learning,100% Free,No
Stanford Online,University-Grade,https://online.stanford.edu/free-courses,High-quality academic content,Free,No
Harvard Online Learning,University-Grade,https://online-learning.harvard.edu,Prestige + quality education,Free,No
Elements of AI,AI & Machine Learning,https://www.elementsofai.com,Absolute beginners wanting AI literacy,100% Free,Yes
Google AI Essentials,AI & Machine Learning,https://grow.google/ai-essentials,Non-tech professionals using AI day-to-day,Free,Yes
Fast.ai,AI & Machine Learning,https://www.fast.ai,Practical AI application,100% Free,No
Kaggle Learn,AI & Machine Learning,https://www.kaggle.com/learn,Learning by doing,100% Free,Yes
DeepLearning.AI,AI & Machine Learning,https://www.deeplearning.ai,Structured AI learning paths,Free Tier Available,Yes (Paid)
Google Digital Garage,AI & Machine Learning,https://learndigital.withgoogle.com/digitalgarage,Business professionals,100% Free,Yes
IBM SkillsBuild,AI & Machine Learning,https://skillsbuild.org,Job-ready credentials,100% Free,Yes
Microsoft Learn AI,AI & Machine Learning,https://learn.microsoft.com/en-us/ai,Microsoft ecosystem users,100% Free,Yes
Amazon AWS Training,AI & Machine Learning,https://aws.amazon.com/training,Cloud-focused AI careers,Free Tier Available,Yes
MyGreatLearning Academy,AI & Machine Learning,https://www.mygreatlearning.com/academy,Free certificates,100% Free,Yes
LinkedIn Learning,Non-Tech Career Skills,https://www.linkedin.com/learning,Professional development,Free via Libraries/Universities,Yes
Skillshare,Non-Tech Career Skills,https://www.skillshare.com,"Creative skills, marketing",Free Trial + Some Free,No
HubSpot Academy,Non-Tech Career Skills,https://academy.hubspot.com,"Marketing, sales certifications",100% Free,Yes
Alison,Non-Tech Career Skills,https://alison.com,"Workplace skills, health, language",100% Free,Yes
Saylor Academy,Non-Tech Career Skills,https://www.saylor.org,Business administration,100% Free,Yes
OpenLearn (Open University),Non-Tech Career Skills,https://www.open.edu/openlearn,"Business, health, education",100% Free,Yes
FutureLearn,Non-Tech Career Skills,https://www.futurelearn.com,Professional & academic courses,Audit Free / Certificate Paid,Yes (Paid)
Canvas Network,Non-Tech Career Skills,https://www.canvas.net,Professional development,Free,No
Class Central,Course Aggregator,https://www.class-central.com,Finding free courses from all platforms,100% Free,No
Khan Academy,Completely Free,https://www.khanacademy.org,"Math, science, computing, test prep",100% Free,No
Codecademy,Completely Free,https://www.codecademy.com,"Coding, data science basics",Free Tier,Yes (Paid)
freeCodeCamp,Completely Free,https://www.freecodecamp.org,"Web development, data analysis",100% Free,Yes
The Odin Project,Completely Free,https://www.theodinproject.com,Full-stack web development,100% Free,Yes
W3Schools,Completely Free,https://www.w3schools.com,"Web technologies, Python, SQL",100% Free,Yes (Paid)
SoloLearn,Completely Free,https://www.sololearn.com,Coding basics on mobile,100% Free,Yes
CS50 (Harvard),Completely Free,https://cs50.harvard.edu/x,Computer science fundamentals,100% Free,Yes
Verizon Skill Forward,Government & Non-Profit,https://www.skillforward.com,Free tech & non-tech training + job board,100% Free,Yes
SWAYAM,Government & Non-Profit,https://swayam.gov.in,Class 9 to post-graduate courses,100% Free,Yes
NPTEL,Government & Non-Profit,https://nptel.ac.in,"Engineering, science, humanities",100% Free,Yes
DIKSHA,Government & Non-Profit,https://diksha.gov.in,School-level resources,100% Free,No
PMI Free Resources,Specialized,https://www.pmi.org/learning/library,Project management fundamentals,Free,No
Google Data Analytics Certificate,Specialized,https://grow.google/dataanalytics,Data analytics career,Free via Workforce Programs,Yes
Google UX Design Certificate,Specialized,https://grow.google/uxdesign,UX design career,Free via Select Programs,Yes
Cybrary,Specialized,https://www.cybrary.it,Cybersecurity skills,Free Tier,Yes
Duolingo,Specialized,https://www.duolingo.com,Language learning,100% Free,No
Investopedia Academy,Specialized,https://www.investopedia.com/academy,Financial literacy,Free,No
Grammarly Academy,Specialized,https://www.grammarly.com/blog,Writing improvement,Free,No
Y Combinator Startup School,Specialized,https://www.startupschool.org,Entrepreneurship,100% Free,Yes`;

function parseCSV(text) {
  const result = [];
  const lines = text.trim().split('\n');
  for (let line of lines) {
    let fields = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' && line[i+1] === '"') {
            current += '"';
            i++; 
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            fields.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    fields.push(current.trim());
    result.push(fields);
  }
  return result;
}

const parsed = parseCSV(csvData);

const newLearning = parsed.map(row => {
    const [name, category, url, bestFor, cost, hasCert] = row;
    return {
        id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: name,
        url: url,
        category: category,
        type: "Training",
        description: bestFor,
        tags: [cost, hasCert === 'Yes' || hasCert.includes('Paid') ? 'Certified' : 'Skills Only'],
        aiExposure: "Low",
        isLearning: true
    };
});

const dataPath = path.resolve('src', 'data', 'platforms.json');
const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Filter out old ones if they exist
const filteredData = currentData.filter(p => !newLearning.some(nl => nl.id === p.id));

// Prepend to array
filteredData.unshift(...newLearning);

fs.writeFileSync(dataPath, JSON.stringify(filteredData, null, 2), 'utf8');
console.log('Successfully prepended All Learning Resources!');
