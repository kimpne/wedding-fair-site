
import Head from 'next/head';
import HeaderNotice from '../components/HeaderNotice';
import RegionTabs from '../components/RegionTabs';
import InternalLinks from '../components/InternalLinks';

export default function 서울웨딩박람회({ sheetData }) {
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
            {sheetData
              .filter((row) => row[0] === '서울')
              .map((row, index) => (
                <li key={index} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                  <a href={row[5] || '#'} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '20px' }}>
                    <img src={row[1] || '/placeholder.jpg'} alt={row[2] || '웨딩박람회'} style={{ width: '200px', height: 'auto' }} />
                    <div>
                      <h3 style={{ margin: 0 }}>{row[2] || '웨딩박람회'}</h3>
                      <p style={{ color: 'red', fontWeight: 'bold' }}>{row[3] || ''}</p>
                      <p style={{ color: '#666' }}>{row[4] || ''}</p>
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

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'wedding-fair-data.json');
    
    if (!fs.existsSync(jsonPath)) {
      return {
        props: {
          sheetData: [],
        },
        revalidate: 60,
      };
    }
    
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
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
