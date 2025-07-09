
import Head from 'next/head';
import RegionTabs from '../components/RegionTabs';
import HeaderNotice from '../components/HeaderNotice';
import InternalLinks from '../components/InternalLinks';

export default function yesu({ sheetData }) {
  const safeSheetData = Array.isArray(sheetData) ? sheetData : [];
  const filteredData = safeSheetData.filter((row) => row[0] === '여수');
  const hasData = filteredData.length > 0;
  const displayData = hasData ? filteredData : [...safeSheetData].reverse().slice(0, 5);

  return (
    <>
      <Head>
        <title>여수웨딩박람회 일정 안내 | 2025년 최신 업데이트</title>
        <meta name="description" content="여수 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="keywords" content="여수 웨딩박람회, 여수 결혼박람회, 여수 스드메" />
        <link rel="canonical" href="https://wdkor.co.kr/yesu" />
        <meta property="og:title" content="여수웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta property="og:description" content="여수 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta property="og:url" content="https://wdkor.co.kr/yesu" />
      </Head>

      <HeaderNotice />
      <RegionTabs />

      <main>
        <div className="container">
          {!hasData && (
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
              여수 지역 웨딩박람회 일정이 현재 없습니다. 최근 박람회 정보를 참고하세요.
            </p>
          )}
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
        </div>
      </main>

      <InternalLinks />
    </>
  );
}

export async function getServerSideProps() {
  const { getSheetData } = require('../lib/sheet');
  
  try {
    const sheetData = await getSheetData();
    return {
      props: {
        sheetData: Array.isArray(sheetData) ? sheetData : [],
      },
    };
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return {
      props: {
        sheetData: [],
      },
    };
  }
}
