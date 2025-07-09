import Head from 'next/head';
import HeaderNotice from '../components/HeaderNotice';
import RegionTabs from '../components/RegionTabs';
import InternalLinks from '../components/InternalLinks';

export default function yesu({ sheetData }) {
  return (
    <>
      <Head>
        <title>2025 여수웨딩박람회 일정 총정리 | 최신 박람회 정보</title>
        <meta
          name="description"
          content="2025년 여수웨딩박람회 일정을 한눈에 확인하세요! 최신 박람회 정보와 혜택을 놓치지 마세요."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://wdkor.co.kr/yesu" />
        <meta property="og:title" content="2025 여수웨딩박람회 일정 총정리" />
        <meta property="og:description" content="2025년 여수웨딩박람회 일정을 한눈에 확인하세요!" />
        <meta property="og:url" content="https://wdkor.co.kr/yesu" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="웨딩박람회 일정 총정리" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="2025 여수웨딩박람회 일정 총정리" />
        <meta name="twitter:description" content="2025년 여수웨딩박람회 일정을 한눈에 확인하세요!" />
        <meta name="keywords" content="여수웨딩박람회, 2025웨딩박람회, 여수웨딩, 웨딩박람회일정" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://wdkor.co.kr/yesu" />
        <meta property="og:title" content="2025 여수웨딩박람회 일정 총정리" />
        <meta property="og:description" content="2025년 여수웨딩박람회 일정을 한눈에 확인하세요!" />
        <meta property="og:url" content="https://wdkor.co.kr/yesu" />
      </Head>

      <HeaderNotice />
      <RegionTabs />

      <main>
        <div className="container" style={{ padding: '30px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>2025 여수 웨딩박람회</h1>

          {(() => {
            const currentRegionData = sheetData.filter((row) => row[0] === '여수');
            const otherRegionData = sheetData.filter((row) => row[0] !== '여수');

            return (
              <>
                {currentRegionData.length === 0 && (
                  <p style={{ color: '#888', marginTop: '20px', textAlign: 'center' }}>
                    ※ 현재 이 지역의 박람회 일정이 없어 전체 최신 박람회 일정으로 대체 노출됩니다.
                  </p>
                )}

                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {currentRegionData.map((row, index) => (
                    <li key={`current-${index}`} className="fair-item">
                      <a href={row[5] || '#'} target="_blank" rel="noopener noreferrer">
                        <img src={row[1] || '/placeholder.jpg'} alt={row[2] || '웨딩박람회'} />
                        <div>
                          <h3>{row[2] || '웨딩박람회'}</h3>
                          <p className="date">{row[3] || ''}</p>
                          <p className="description">{row[4] || ''}</p>
                        </div>
                      </a>
                    </li>
                  ))}

                  {currentRegionData.length > 0 && otherRegionData.length > 0 && (
                    <li className="section-divider">
                      <h2>다른 지역 웨딩박람회</h2>
                    </li>
                  )}

                  {otherRegionData.map((row, index) => (
                    <li key={`other-${index}`} className="fair-item">
                      <a href={row[5] || '#'} target="_blank" rel="noopener noreferrer">
                        <img src={row[1] || '/placeholder.jpg'} alt={row[2] || '웨딩박람회'} />
                        <div>
                          <h3>{row[2] || '웨딩박람회'}</h3>
                          <p className="date">{row[3] || ''}</p>
                          <p className="description">{row[4] || ''}</p>
                          <p className="location">📍 {row[0]}</p>
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