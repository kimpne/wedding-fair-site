
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function sheetToJson() {
  try {
    // 로컬에서 실행할 때는 credentials.json 사용
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || fs.readFileSync('credentials.json', 'utf-8'));
    
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1ndcPLgJV-NeW3zWB4NCZzJM3E7EKAK01cdI1pSycnfI';
    const range = '시트1!A2:F';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const sheetData = response.data.values || [];
    
    // public 폴더에 JSON 파일로 저장
    const jsonPath = path.join(__dirname, '..', 'public', 'wedding-fair-data.json');
    fs.writeFileSync(jsonPath, JSON.stringify(sheetData, null, 2), 'utf-8');
    
    console.log(`✅ 시트 데이터를 JSON으로 변환 완료: ${sheetData.length}개 행`);
    console.log(`📁 저장 위치: ${jsonPath}`);
    
    // 데이터 미리보기
    console.log('\n📋 데이터 미리보기:');
    sheetData.slice(0, 3).forEach((row, index) => {
      console.log(`${index + 1}. ${row[0]} | ${row[2]} | ${row[3]}`);
    });
    
  } catch (error) {
    console.error('❌ 시트 데이터 변환 실패:', error);
  }
}

sheetToJson();
