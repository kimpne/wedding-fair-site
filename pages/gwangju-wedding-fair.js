
import Head from 'next/head';
import HeaderNotice from '../components/HeaderNotice';
import RegionTabs from '../components/RegionTabs';
import InternalLinks from '../components/InternalLinks';

export default function 광주웨딩박람회({ sheetData }) {
  return (
    <>
      <Head>
        <title>2025 광주웨딩박람회 일정 총정리 | 최신 박람회 정보</title>
        <meta
          name="description"
          content="2025년 광주웨딩박람회 일정을 한눈에 확인하세요! 최신 박람회 정보와 혜택을 놓치지 마세요."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNotice />
      <RegionTabs />

      <main>
        <div className="container" style={{ padding: '30px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>2025 광주 웨딩박람회</h1>

          {(() => {
            const currentRegionData = sheetData.filter((row) => row[0] === '광주');
            const otherRegionData = sheetData.filter((row) => row[0] !== '광주');
            
            return (
              <>
                {currentRegionData.length === 0 && (
                  <p style={{ color: '#888', marginTop: '20px', textAlign: 'center' }}>
                    ※ 현재 이 지역의 박람회 일정이 없어 전체 최신 박람회 일정으로 대체 노출됩니다.
                  </p>
                )}
                
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {currentRegionData.map((row, index) => (
                    <li key={`current-${index}`} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
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
                  
                  {currentRegionData.length > 0 && otherRegionData.length > 0 && (
                    <li style={{ margin: '40px 0 20px 0', textAlign: 'center' }}>
                      <h2 style={{ color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
                        다른 지역 웨딩박람회
                      </h2>
                    </li>
                  )}
                  
                  {otherRegionData.map((row, index) => (
                    <li key={`other-${index}`} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                      <a href={row[5] || '#'} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '20px' }}>
                        <img src={row[1] || '/placeholder.jpg'} alt={row[2] || '웨딩박람회'} style={{ width: '200px', height: 'auto' }} />
                        <div>
                          <h3 style={{ margin: 0 }}>{row[2] || '웨딩박람회'}</h3>
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
