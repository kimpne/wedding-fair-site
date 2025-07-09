import Head from 'next/head';
import RegionTabs from '../components/RegionTabs';
import HeaderNotice from '../components/HeaderNotice';
import InternalLinks from '../components/InternalLinks';

export default function 울산웨딩박람회({ sheetData }) {
  // Ensure sheetData is always an array
  const safeSheetData = Array.isArray(sheetData) ? sheetData : [];

  return (
    <>
      <Head>
        <title>울산웨딩박람회 일정 안내 | 2025년 최신 업데이트</title>
        <meta name="description" content="울산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="keywords" content="울산 웨딩박람회, 울산 결혼박람회, 울산 스드메" />
        <link rel="canonical" href="https://wdkor.co.kr/ulsan-wedding-fair" />
        <meta property="og:title" content="울산웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta property="og:description" content="울산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta property="og:url" content="https://wdkor.co.kr/ulsan-wedding-fair" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "울산웨딩박람회",
              "startDate": "2025-01-01",
              "location": {
                "@type": "Place",
                "name": "울산 웨딩박람회 장소"
              },
              "description": "울산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요.",
              "url": "https://wdkor.co.kr/ulsan-wedding-fair"
            })
          }}
        />
      </Head>

      <HeaderNotice />
      <RegionTabs />

      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>2025 울산 웨딩박람회</h1>

      <main>
        <div className="container">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {safeSheetData
              .filter((row) => row[0] === '울산')
              .map((row, index) => (
                <li key={index} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                  <a href={row[5]} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '20px' }}>
                    <img src={row[1]} alt={row[2]} style={{ width: '200px', height: 'auto' }} />
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
    const range = '시트1!A2:D';

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