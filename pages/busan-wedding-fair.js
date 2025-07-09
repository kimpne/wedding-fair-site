import Head from 'next/head';
import RegionTabs from '../components/RegionTabs';
import HeaderNotice from '../components/HeaderNotice';
import InternalLinks from '../components/InternalLinks';


export default function 부산웨딩박람회({ sheetData }) {
  return (
    <>

      <Head>
        <title>부산웨딩박람회 일정 안내 | 2025년 최신 업데이트</title>
        <meta name="description" content="부산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="keywords" content="부산 웨딩박람회, 부산 결혼박람회, 부산 스드메" />
        <link rel="canonical" href="https://wdkor.co.kr/busan-wedding-fair" />
        <meta property="og:title" content="부산웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta property="og:description" content="부산 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta property="og:url" content="https://wdkor.co.kr/busan-wedding-fair" />
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
  <div className="container">
        <ul>
          {sheetData
            .filter((row) => row[0] === '부산')  // 
    .map((row, idx) => (
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
