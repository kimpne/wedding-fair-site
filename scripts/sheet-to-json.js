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

    function parseDate(dateString) {
        const parts = dateString.split('.');
        if (parts.length === 3) {
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-indexed
            const day = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
        return new Date(dateString); // fallback, will likely return Invalid Date
    }

    // 오늘 날짜 기준으로 정렬 (미래 날짜 먼저, 과거 날짜는 뒤로)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간 부분 제거하여 날짜만 비교

    const sortedData = sheetData.sort((a, b) => {
      const dateA = parseDate(a[3]); // 4번째 컬럼이 날짜
      const dateB = parseDate(b[3]);

      const isFutureA = dateA >= today;
      const isFutureB = dateB >= today;

      // 미래 날짜와 과거 날짜 구분
      if (isFutureA && !isFutureB) return -1; // A가 미래, B가 과거 -> A를 앞으로
      if (!isFutureA && isFutureB) return 1;  // A가 과거, B가 미래 -> B를 앞으로

      // 둘 다 미래거나 둘 다 과거인 경우 날짜순 정렬
      return dateA - dateB;
    });


    // public 폴더에 JSON 파일로 저장
    const jsonPath = path.join(__dirname, '..', 'public', 'wedding-fair-data.json');
    fs.writeFileSync(jsonPath, JSON.stringify(sortedData, null, 2), 'utf-8');

    console.log(`✅ 시트 데이터를 JSON으로 변환 완료: ${sortedData.length}개 행 (미래 날짜 우선 정렬)`);
    console.log(`📁 저장 위치: ${jsonPath}`);

    // 데이터 미리보기
    console.log('\n📋 데이터 미리보기 (미래 날짜 우선):');
    sortedData.slice(0, 3).forEach((row, index) => {
      console.log(`${index + 1}. ${row[0]} | ${row[2]} | ${row[3]}`);
    });

  } catch (error) {
    console.error('❌ 시트 데이터 변환 실패:', error);
  }
}

sheetToJson();