
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    // JSON 파일에서 데이터 읽기
    const jsonPath = path.join(process.cwd(), 'public', 'wedding-fair-data.json');
    
    if (!fs.existsSync(jsonPath)) {
      return res.status(404).json({ error: 'Wedding fair data not found' });
    }
    
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const sheetData = JSON.parse(jsonData);
    
    res.status(200).json(sheetData);
  } catch (error) {
    console.error('Error reading JSON data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
