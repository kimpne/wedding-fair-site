
import Head from 'next/head';
import HeaderNotice from '../components/HeaderNotice';
import RegionTabs from '../components/RegionTabs';
import InternalLinks from '../components/InternalLinks';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BusanWeddingFair() {
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    fetch('/wedding-fair-data.json')
      .then((res) => res.json())
      .then((data) => setSheetData(data))
      .catch((err) => console.error('JSON fetch error:', err));
  }, []);
  return (
    <>
      <Head>
        <title>부산웨딩박람회 일정 안내 | 2025년 최신 업데이트</title>
        <meta name="description" content="부산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="keywords" content="부산 웨딩박람회, 부산 결혼박람회, 부산 스드메" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://wdkor.co.kr/busan-wedding-fair" />
        <meta property="og:title" content="부산웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta property="og:description" content="부산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta property="og:url" content="https://wdkor.co.kr/busan-wedding-fair" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="웨딩박람회 일정 총정리" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="부산웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta name="twitter:description" content="부산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "부산웨딩박람회",
              "startDate": "2025-01-01",
              "location": {
                "@type": "Place",
                "name": "부산 웨딩박람회 장소"
              },
              "description": "부산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요.",
              "url": "https://wdkor.co.kr/busan-wedding-fair"
            })
          }}
        />
      </Head>

      <HeaderNotice />
      <RegionTabs />

      <main>
        <div className="container" style={{ padding: '30px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              2025 부산 웨딩박람회
            </Link>
          </h1>

          {(() => {
            const currentRegionData = sheetData.filter((row) => row[0] === '부산');
            const otherRegionData = sheetData.filter((row) => row[0] !== '부산');
            
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
                    <li key={`other-${index}`} className="fair-item">
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


