import { google } from 'googleapis';
import path from 'path';
import { promises as fs } from 'fs';

export async function getSheetData() {
  const keyFile = path.join(process.cwd(), 'credentials.json');
  const credentials = JSON.parse(await fs.readFile(keyFile, 'utf8'));

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = '1ndcPLgJV-NeW3zWB4NCZzJM3E7EKAK01cdI1pSycnfI';
  const range = '시트1!A2:F';  // 지역 포함 (A~F)

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values; // rows만 리턴
}
