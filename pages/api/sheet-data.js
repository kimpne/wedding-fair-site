// pages/api/sheet-data.js
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), 'credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = '1ndcPLgJV-NeW3zWB4NCZzJM3E7EKAK01cdI1pSycnfI';
  const range = '시트1!A2:D';

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    res.status(200).json(response.data.values);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
