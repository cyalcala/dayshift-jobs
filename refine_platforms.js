import fs from 'fs';

const DATA_PATH = './src/data/platforms.json';

try {
    let data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

    // Remove Facebook links
    const originalCount = data.length;
    data = data.filter(p => !p.url.includes('facebook.com'));
    console.log(`Removed ${originalCount - data.length} Facebook links.`);

    // Add Upwork and Fiverr
    const globalMarketplaces = [
        {
            id: 'upwork',
            name: 'Upwork',
            url: 'https://www.upwork.com',
            category: 'Global VA & Outsourcing',
            type: 'Work',
            description: "The world's largest freelance marketplace. High-density opportunities for Filipino freelancers across all niches.",
            tags: ['Global', 'Marketplace'],
            aiExposure: 'Low',
            isPlacementAgency: false
        },
        {
            id: 'fiverr',
            name: 'Fiverr',
            url: 'https://www.fiverr.com',
            category: 'Global VA & Outsourcing',
            type: 'Work',
            description: 'Global gig marketplace. Excellent for specialized services like design, translation, and quick VA tasks.',
            tags: ['Global', 'Gigs'],
            aiExposure: 'Low',
            isPlacementAgency: false
        }
    ];

    globalMarketplaces.forEach(m => {
        if (!data.find(e => e.id === m.id)) {
            data.push(m);
            console.log(`Added ${m.name}.`);
        }
    });

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    console.log('Cleanup and addition complete.');

} catch (error) {
    console.error('Error:', error);
}
