
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SPREADSHEET_ID = '1ndcPLgJV-NeW3zWB4NCZzJM3E7EKAK01cdI1pSycnfI';
const RANGE = '시트2!A:B';
const BASE_URL = 'https://wdkor.co.kr';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

async function generatePages() {
  try {
    if (!process.env.GOOGLE_CREDENTIALS) {
      throw new Error('GOOGLE_CREDENTIALS 환경변수가 설정되지 않았습니다.');
    }
    
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = res.data.values.slice(1).filter(row => row.length >= 2);
    console.log(`불러온 키워드 수: ${rows.length}`);

    rows.forEach(([slug, region]) => {
      const safeSlug = slug.trim().replace(/[^가-힣\w-]/g, '');
      const safeRegion = region.trim();
      const filePath = path.join(__dirname, '..', 'pages', `${safeSlug}.js`);

      const content = `import Head from 'next/head';
import HeaderNotice from '../components/HeaderNotice';
import RegionTabs from '../components/RegionTabs';
import InternalLinks from '../components/InternalLinks';
import Link from 'next/link';

export default function ${safeSlug.replace(/\s+/g, '')}({ sheetData }) {
  return (
    <>
      <Head>
        <title>${safeRegion}웨딩박람회 일정 안내 | 2025년 최신 업데이트</title>
        <meta name="description" content="${safeRegion} 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="keywords" content="${safeRegion} 웨딩박람회, ${safeRegion} 결혼박람회, ${safeRegion} 스드메" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="${BASE_URL}/${safeSlug}" />
        <meta property="og:title" content="${safeRegion}웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta property="og:description" content="${safeRegion} 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta property="og:url" content="${BASE_URL}/${safeSlug}" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="웨딩박람회 일정 총정리" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="${safeRegion}웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta name="twitter:description" content="${safeRegion} 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "${safeRegion}웨딩박람회",
              "startDate": "2025-01-01",
              "location": {
                "@type": "Place",
                "name": "${safeRegion} 웨딩박람회 장소"
              },
              "description": "${safeRegion} 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요.",
              "url": "${BASE_URL}/${safeSlug}"
            })
          }}
        />
      </Head>

      <HeaderNotice />
      <RegionTabs />

      <main>
        <div className="container" style={{ padding: '30px' }}>
          <Link href="/" passHref>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', cursor: 'pointer' }}>
              2025 ${safeRegion} 웨딩박람회
            </h1>
          </Link>

          {(() => {
            const currentRegionData = sheetData.filter((row) => row[0] === '${safeRegion}');
            const otherRegionData = sheetData.filter((row) => row[0] !== '${safeRegion}');
            
            return (
              <>
                {currentRegionData.length === 0 && (
                  <p style={{ color: '#888', marginTop: '20px', textAlign: 'center' }}>
                    ※ 현재 이 지역의 박람회 일정이 없어 전체 최신 박람회 일정으로 대체 노출됩니다.
                  </p>
                )}
                
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {currentRegionData.map((row, index) => (
                    <li key={\`current-\${index}\`} className="fair-item">
                      <a href={row[5] || '#'} target="_blank" rel="noopener noreferrer">
                        <img src={row[1] || '/placeholder.jpg'} alt={row[2] || '웨딩박람회'} />
                        <div>
                          <h3>{row[2] || '웨딩박람회'}</h3>
                          <p style={{ color: 'red', fontWeight: 'bold' }}>{row[3] || ''}</p>
                          <p style={{ color: '#666' }}>{row[4] || ''}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                  
                  {currentRegionData.length > 0 && otherRegionData.length > 0 && (
                    <li style={{ margin: '40px 0 20px 0', textAlign: 'center' }}>
                      <h2 style={{ color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
                        다른 지역 웨딩박람회
                      </h2>
                    </li>
                  )}
                  
                  {otherRegionData.map((row, index) => (
                    <li key={\`other-\${index}\`} className="fair-item">
                      <a href={row[5] || '#'} target="_blank" rel="noopener noreferrer">
                        <img src={row[1] || '/placeholder.jpg'} alt={row[2] || '웨딩박람회'} />
                        <div>
                          <h3>{row[2] || '웨딩박람회'}</h3>
                          <p style={{ color: 'red', fontWeight: 'bold' }}>{row[3] || ''}</p>
                          <p style={{ color: '#666' }}>{row[4] || ''}</p>
                          <p style={{ color: '#999', fontSize: '14px' }}>📍 {row[0]}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            );
          })()}
        </div>
      </main>

      <InternalLinks />
    </>
  );
}

export async function getStaticProps() {
  const fs = await import('fs');
  const path = await import('path');
  
  try {
    const jsonPath = path.default.join(process.cwd(), 'public', 'wedding-fair-data.json');
    
    if (!fs.default.existsSync(jsonPath)) {
      return {
        props: {
          sheetData: [],
        },
        revalidate: 60,
      };
    }
    
    const jsonData = fs.default.readFileSync(jsonPath, 'utf-8');
    const sheetData = JSON.parse(jsonData);

    return {
      props: {
        sheetData: Array.isArray(sheetData) ? sheetData : [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        sheetData: [],
      },
      revalidate: 60,
    };
  }
}
`;

      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ 페이지 생성 완료: ${safeSlug}.js`);
    });

    console.log(`\n🎉 총 ${rows.length}개 페이지 생성 완료!`);
  } catch (error) {
    console.error('❌ 페이지 생성 중 오류 발생:', error);
    
    if (error.message.includes('GOOGLE_CREDENTIALS')) {
      console.log('\n💡 해결방법:');
      console.log('1. Google Cloud Console에서 서비스 계정 키를 다운로드');
      console.log('2. Replit Secrets에 GOOGLE_CREDENTIALS 환경변수 설정');
      console.log('3. JSON 내용을 문자열로 변환해서 입력');
      console.log('4. Google Sheets API 활성화 확인');
    }
  }
}

generatePages().catch(console.error);
