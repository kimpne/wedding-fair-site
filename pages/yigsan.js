import Head from 'next/head';
import RegionTabs from '../components/RegionTabs';
import HeaderNotice from '../components/HeaderNotice';
import InternalLinks from '../components/InternalLinks';

export default function yigsan({ sheetData }) {
  const filteredData = sheetData.filter((row) => row[0] === '익산');
  const hasData = filteredData.length > 0;
  const displayData = hasData ? filteredData : [...sheetData].reverse();

  return (
    <>
      <Head>
        <title>익산 웨딩박람회 일정 안내 | 2025년 최신 업데이트</title>
        <meta name="description" content="익산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="keywords" content="익산 웨딩박람회, 익산 결혼박람회, 익산 스드메" />
        <link rel="canonical" href="https://wdkor.co.kr/yigsan" />
        <meta property="og:title" content="익산 웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta property="og:description" content="익산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta property="og:url" content="https://wdkor.co.kr/yigsan" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "익산웨딩박람회",
              "startDate": "2025-01-01",
              "location": {
                "@type": "Place",
                "name": "익산 웨딩박람회 장소"
              },
              "description": "익산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요.",
              "url": "https://wdkor.co.kr/yigsan"
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sheet`);
  const sheetData = await res.json();

  return { props: { sheetData } };
}
