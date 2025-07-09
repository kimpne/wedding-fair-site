
export default async function handler(req, res) {
  const { google } = require('googleapis');

  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');
    
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1ndcPLgJV-NeW3zWB4NCZzJM3E7EKAK01cdI1pSycnfI';
    const range = '시트1!A2:D';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const sheetData = response.data.values || [];
    res.status(200).json(sheetData);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
