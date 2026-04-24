import XLSX from 'xlsx';
import fs from 'fs';

const filePath = 'C:/Users/admin/Downloads/remotework3.9.xlsx';

try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    console.log('--- EXCEL HEADERS ---');
    console.log(data[0]);
    console.log('--- SAMPLE ROW ---');
    console.log(data[1]);
} catch (error) {
    console.error('Error reading Excel file:', error.message);
}
