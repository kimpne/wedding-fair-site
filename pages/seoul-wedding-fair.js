import Head from 'next/head';
import HeaderNotice from '../components/HeaderNotice';
import RegionTabs from '../components/RegionTabs';
import InternalLinks from '../components/InternalLinks';

export default function 서울웨딩박람회({ sheetData }) {
  // Ensure sheetData is always an array
  const safeSheetData = Array.isArray(sheetData) ? sheetData : [];

  return (
    <>
      <Head>
        <title>2025 서울웨딩박람회 일정 총정리 | 최신 박람회 정보</title>
        <meta
          name="description"
          content="2025년 서울웨딩박람회 일정을 한눈에 확인하세요! 최신 박람회 정보와 혜택을 놓치지 마세요."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNotice />
      <RegionTabs />

      <main>
        <div className="container" style={{ padding: '30px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>2025 서울 웨딩박람회</h1>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {safeSheetData
              .filter((row) => row[0] === '서울')
              .map((row, index) => (
                <li key={index} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                  <a href={row[5] || "#"} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '20px' }}>
                    <img src={row[1] || "/placeholder.jpg"} alt={row[2] || "웨딩박람회"} style={{ width: '200px', height: 'auto' }} />
                    <div>
                      <h3 style={{ margin: 0 }}>{row[2]}</h3>
                      <p style={{ color: 'red', fontWeight: 'bold' }}>{row[3]}</p>
                      <p style={{ color: '#666' }}>{row[4]}</p>
                    </div>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </main>

      <InternalLinks />
    </>
  );
}

export async function getServerSideProps() {
  const { google } = require('googleapis');
  
  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');
    
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

    return {
      props: {
        sheetData: Array.isArray(sheetData) ? sheetData : [],
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        sheetData: [],
      },
    };
  }
}