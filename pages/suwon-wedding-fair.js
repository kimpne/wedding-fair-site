import Head from 'next/head';
import HeaderNotice from '../components/HeaderNotice';
import RegionTabs from '../components/RegionTabs';
import InternalLinks from '../components/InternalLinks';

export default function 수원웨딩박람회({ sheetData }) {
  // Ensure sheetData is always an array
  const safeSheetData = Array.isArray(sheetData) ? sheetData : [];

  return (
    <>
      <Head>
        <title>수원 웨딩박람회 일정 정보</title>
        <meta name="description" content="수원 지역의 최신 웨딩박람회 일정과 정보를 확인하세요." />
      </Head>

      <HeaderNotice />
      <RegionTabs currentRegion="suwon" />

      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>수원 웨딩박람회</h1>

        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {safeSheetData
              .filter(row => row && row[1] && row[1].includes('수원'))
              .map((row, index) => (
                <li key={index} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <a href={row[5]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '15px' }}>
                    <div>
                      <h3>{row[2]}</h3>
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