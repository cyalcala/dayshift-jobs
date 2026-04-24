import fs from 'fs';

const DATA_PATH = './src/data/platforms.json';

try {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

    const upworkIndex = data.findIndex(p => p.id === 'upwork');
    if (upworkIndex > -1) {
        const upwork = data.splice(upworkIndex, 1)[0];
        // Move to the beginning of the array so it's processed first for its category
        data.unshift(upwork);
        console.log('Promoted Upwork to the top of the list.');
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    console.log('Updated platforms.json successfully.');

} catch (error) {
    console.error('Error:', error);
}
