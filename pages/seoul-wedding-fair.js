
import Head from 'next/head';
import { useState, useEffect } from 'react';
import HeaderNotice from '../components/HeaderNotice';
import RegionTabs from '../components/RegionTabs';
import InternalLinks from '../components/InternalLinks';

export default function 서울웨딩박람회() {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sheet-data');
        const data = await response.json();
        setSheetData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSheetData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Head>
          <title>2025 서울웨딩박람회 일정 총정리 | 최신 박람회 정보</title>
          <meta name="description" content="2025년 서울웨딩박람회 일정을 한눈에 확인하세요! 최신 박람회 정보와 혜택을 놓치지 마세요." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HeaderNotice />
        <RegionTabs />
        <main>
          <div className="container" style={{ padding: '30px', textAlign: 'center' }}>
            <h1>2025 서울 웨딩박람회</h1>
            <p>데이터를 불러오는 중...</p>
          </div>
        </main>
        <InternalLinks />
      </>
    );
  }

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
