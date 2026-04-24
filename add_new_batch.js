import fs from 'fs';

const NEW_COMPANIES = [
    { name: "Cloudstaff", url: "https://www.cloudstaff.com", description: "Major player in AU outsourcing, known for its great culture and numerous remote dayshift opportunities." },
    { name: "ConnectOS", url: "https://connectos.co", description: "Australian-owned BPO with a strong presence in the Philippines, offering remote and hybrid dayshift roles." },
    { name: "Diversify OSS", url: "https://diversifyoss.com", description: "Australian-managed offshore staffing provider with significant remote operations and dayshift roles." },
    { name: "EMAPTA", url: "https://emapta.com", description: "Specializes in building remote teams for Australian and international clients with premium dayshift roles." },
    { name: "EzyVA (Hiring)", url: "https://ezyva.com/careers", description: "Australian-owned outsourcing company with a large remote workforce in the Philippines, hiring for various roles." },
    { name: "Global Teams", url: "https://globalteams.com.au", description: "Connects Filipino VAs with Australian companies in admin, marketing, and customer service." },
    { name: "Hammerjack", url: "https://hammerjack.com.au", description: "Australian outsourcing firm with operations in the Philippines, hiring for accounting and admin roles." },
    { name: "HireTalent.ph", url: "https://hiretalent.ph", description: "A top-tier staffing agency for Filipino VAs, specifically targeting Australian accounts with pure dayshift schedules." },
    { name: "Intogreat Solutions (Careers)", url: "https://intogreat.com.au/careers", description: "Australian-managed BPO focusing on high-value remote roles in finance and accounting for AU firms." },
    { name: "Knights of Online Sales (KOOS)", url: "https://koos.com.au", description: "Australian agency specializing in sales and admin support, hiring Filipino remote talent for dayshift." },
    { name: "MicroSourcing", url: "https://www.microsourcing.com", description: "One of the largest outsourcing providers in the PH, with many Australian accounts hiring for dayshift." },
    { name: "My Cloud Assistant", url: "https://mycloudassistant.com.au", description: "Australian-managed agency providing dedicated Filipino assistants for small to medium businesses." },
    { name: "Outsource Workers (Jobs)", url: "https://outsourceworkers.com.au/virtual-assistant-jobs", description: "Specialized job portal for Australian real estate virtual assistant roles, primarily dayshift." },
    { name: "Platinum Outsourcing (Jobs)", url: "https://platinumoutsourcing.com.au/jobs", description: "Australian provider offering Filipino staff for VA, customer support, and digital marketing." },
    { name: "ProSource (Careers)", url: "https://prosource.com.au/careers", description: "Recruits Filipino VA contractors for admin, e-commerce, and marketing specifically for AU clients." },
    { name: "Remote Talent Australia", url: "https://remotetalentaustralia.com", description: "Specializes in matching Filipino VAs with Australian clients for long-term dayshift roles with HMO." },
    { name: "Satellite Office", url: "https://www.satelliteoffice.com.au", description: "Australian-owned offshoring provider with a focus on high-quality remote talent in the Philippines." },
    { name: "Shore360 (Careers)", url: "https://shore360.com/careers", description: "Australian-owned BPO offering remote roles for global clients with a focus on AU time zones." },
    { name: "Staff Domain (Jobs)", url: "https://staffdomain.com/jobs", description: "Offshore staffing for AU businesses, hiring Filipino accountants, VAs, and tech staff for dayshift." },
    { name: "Staffing Solutions", url: "https://staffingsolutions.io", description: "Offers remote staffing for Australian firms with a focus on administrative and specialized support." },
    { name: "The Remote Group", url: "https://theremotegroup.com", description: "Australian-managed firm hiring Filipino remote talent for various professional roles on AU time." },
    { name: "VA Platinum", url: "https://vaplatinum.com.au", description: "Australian-owned VA agency with a dedicated operations center in the Philippines for remote staff." },
    { name: "Virtual Assistant Academy (VAA)", url: "https://www.vaa.ph", description: "Australian-linked training and placement agency for Filipino VAs, focusing on AU business standards." },
    { name: "Virtual Elves (Careers)", url: "https://virtualelves.com.au/careers", description: "Australian agency matching Filipino VAs with Aussie small businesses for administrative support." },
    { name: "Yoonet (Jobs)", url: "https://www.yoonet.io/careers", description: "Australian outsourcing firm with a strong focus on remote teams for AU clients, often providing equipment." }
];

const DATA_PATH = './src/data/platforms.json';

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

try {
    const existingData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    let addedCount = 0;

    NEW_COMPANIES.forEach(comp => {
        const id = slugify(comp.name);
        // Check by ID or URL (ignoring subpaths for URL check)
        const baseUrl = comp.url.split('?')[0].replace(/\/$/, '');
        const exists = existingData.find(e => 
            e.id === id || 
            e.url.replace(/\/$/, '').includes(baseUrl) ||
            baseUrl.includes(e.url.replace(/\/$/, ''))
        );

        if (!exists) {
            existingData.push({
                id,
                name: comp.name,
                url: comp.url,
                category: "Australian & Dayshift VA",
                type: "Work",
                description: comp.description,
                tags: ["Dayshift", "Verified"],
                aiExposure: "Low",
                isPlacementAgency: true
            });
            addedCount++;
        } else {
            console.log(`Skipping duplicate: ${comp.name} (${comp.url}) matches existing ${exists.name}`);
        }
    });

    fs.writeFileSync(DATA_PATH, JSON.stringify(existingData, null, 2));
    console.log(`Successfully added ${addedCount} new companies.`);

} catch (error) {
    console.error('Error adding companies:', error);
}
