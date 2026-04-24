import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const EXCEL_PATH = 'C:/Users/admin/Downloads/remotework3.9.xlsx';
const OUTPUT_PATH = './src/data/platforms.json';

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

function mapCategory(original) {
    const cat = original || 'Other';
    if (cat.includes('Australian') || cat.includes('AU')) return 'Australian & Dayshift VA';
    if (cat.includes('Virtual Assistant') || cat.includes('VA') || cat.includes('Outsourcing') || cat.includes('Staffing')) return 'Global VA & Outsourcing';
    if (cat.includes('E-commerce') || cat.includes('Marketing') || cat.includes('Digital')) return 'E-commerce & Marketing';
    if (cat.includes('BPO') || cat.includes('Support') || cat.includes('Customer')) return 'BPO & Professional Services';
    if (cat.includes('Job') || cat.includes('Facebook') || cat.includes('Resource')) return 'Job Boards & Resources';
    if (cat.includes('Tech') || cat.includes('IT') || cat.includes('Data')) return 'Technology & Specialized';
    return 'Professional Services';
}

try {
    console.log('Reading Excel file...');
    const workbook = XLSX.readFile(EXCEL_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log(`Processing ${data.length} records...`);

    const platforms = data.map((row, index) => {
        const name = row['Remote Work Website'] || 'Unknown';
        const url = row['Links'] || '#';
        const description = row['About'] || '';
        const category = mapCategory(row['Category']);

        return {
            id: slugify(name) || `id-${index}`,
            name,
            url,
            category,
            type: 'Work',
            description,
            tags: [
                category.includes('Australian') ? 'Dayshift' : 'Remote',
                'Verified'
            ],
            aiExposure: 'Low',
            isPlacementAgency: true
        };
    });

    // Sort by category importance (can be refined later)
    const categoryPriority = [
        'Australian & Dayshift VA',
        'Global VA & Outsourcing',
        'E-commerce & Marketing',
        'BPO & Professional Services',
        'Technology & Specialized',
        'Job Boards & Resources'
    ];

    platforms.sort((a, b) => {
        const priorityA = categoryPriority.indexOf(a.category);
        const priorityB = categoryPriority.indexOf(b.category);
        return priorityA - priorityB;
    });

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(platforms, null, 2));
    console.log(`Successfully wrote ${platforms.length} platforms to ${OUTPUT_PATH}`);

} catch (error) {
    console.error('Error during ingestion:', error);
}
