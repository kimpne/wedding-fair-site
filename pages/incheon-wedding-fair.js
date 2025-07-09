
import Head from 'next/head';
import HeaderNotice from '../components/HeaderNotice';
import RegionTabs from '../components/RegionTabs';
import InternalLinks from '../components/InternalLinks';

export default function 인천웨딩박람회({ sheetData }) {
  // Ensure sheetData is always an array
  const safeSheetData = Array.isArray(sheetData) ? sheetData : [];

  return (
    <>
      <Head>
        <title>2025 인천웨딩박람회 일정 총정리 | 최신 박람회 정보</title>
        <meta
          name="description"
          content="2025년 인천웨딩박람회 일정을 한눈에 확인하세요! 최신 박람회 정보와 혜택을 놓치지 마세요."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNotice />
      <RegionTabs />

      <main>
        <div className="container" style={{ padding: '30px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>2025 인천 웨딩박람회</h1>
          
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {safeSheetData
              .filter((row) => row[1] && row[1].includes('인천'))
              .map((row, index) => (
                <li key={index} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                  <a
                    href={row[0] || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      padding: '15px',
                      textDecoration: 'none',
                      color: 'inherit',
                      backgroundColor: '#f9f9f9',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <div>
                      <h3 style={{ color: '#E91E63', margin: '0 0 10px 0' }}>{row[2]}</h3>
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
