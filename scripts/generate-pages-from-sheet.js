// ✅ wedding-fair-pages-generator.js (최종 자동화 스크립트, 수정된 메타 포함)

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SPREADSHEET_ID = '1ndcPLgJV-NeW3zWB4NCZzJM3E7EKAK01cdI1pSycnfI';
const RANGE = '시트2!A:B';
const BASE_URL = 'https://wdkor.co.kr';

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '..', 'credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

async function generatePages() {
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
import RegionTabs from '../components/RegionTabs';
import HeaderNotice from '../components/HeaderNotice';
import InternalLinks from '../components/InternalLinks';

export default function ${safeSlug.replace(/\s+/g, '')}({ sheetData }) {
  const filteredData = sheetData.filter((row) => row[0] === '${safeRegion}');
  const hasData = filteredData.length > 0;
  const displayData = hasData ? filteredData : [...sheetData].reverse();

  return (
    <>
      <Head>
        <title>${safeRegion} 웨딩박람회 일정 안내 | 2025년 최신 업데이트</title>
        <meta name="description" content="${safeRegion} 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="keywords" content="${safeRegion} 웨딩박람회, ${safeRegion} 결혼박람회, ${safeRegion} 스드메" />
        <link rel="canonical" href="${BASE_URL}/${safeSlug}" />
        <meta property="og:title" content="${safeRegion} 웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta property="og:description" content="${safeRegion} 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta property="og:url" content="${BASE_URL}/${safeSlug}" />
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
        <div className="container">
          <ul>
            {displayData.map((row, idx) => (
              <li key={idx} style={{ borderBottom: '1px dashed #ccc', padding: '20px 0' }}>
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

          {!hasData && (
            <p style={{ color: '#888', marginTop: '20px' }}>
              ※ 현재 이 지역의 박람회 일정이 없어 전체 최신 박람회 일정으로 대체 노출됩니다.
            </p>
          )}

          <InternalLinks />
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(\`\${process.env.NEXT_PUBLIC_SITE_URL}/api/sheet\`);
  const sheetData = await res.json();

  return { props: { sheetData } };
}
`;

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ 페이지 생성 완료: ${safeSlug}.js`);
  });
}

generatePages().catch(console.error);
