import Head from 'next/head';
import HeaderNotice from '../components/HeaderNotice';
import RegionTabs from '../components/RegionTabs';
import InternalLinks from '../components/InternalLinks';
import Link from 'next/link';

export default function daejeon({ sheetData }) {
  return (
    <>
      <Head>
        <title>대전웨딩박람회 일정 안내 | 2025년 최신 업데이트</title>
        <meta name="description" content="대전 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="keywords" content="대전 웨딩박람회, 대전 결혼박람회, 대전 스드메" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://wdkor.co.kr/daejeon" />
        <meta property="og:title" content="대전웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta property="og:description" content="대전 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta property="og:url" content="https://wdkor.co.kr/daejeon" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="웨딩박람회 일정 총정리" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="대전웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta name="twitter:description" content="대전 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "대전웨딩박람회",
              "startDate": "2025-01-01",
              "location": {
                "@type": "Place",
                "name": "대전 웨딩박람회 장소"
              },
              "description": "대전 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요.",
              "url": "https://wdkor.co.kr/daejeon"
            })
          }}
        />
      </Head>

      <HeaderNotice />
      <RegionTabs />

      <main>
        <div className="container" style={{ padding: '30px' }}>
          <Link href="/" passHref>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', cursor: 'pointer' }}>
              2025 대전 웨딩박람회
            </h1>
          </Link>

          {(() => {
            const currentRegionData = sheetData.filter((row) => row[0] === '대전');
            const otherRegionData = sheetData.filter((row) => row[0] !== '대전');
            
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

export async function getStaticProps() {
  // 빌드 시점에 고정된 데이터
  const sheetData = [
    [
        "서울",
        "https://www.replyalba.com/intros/st_wdf/img/og.jpg",
        "세텍 허니문 페어",
        "25.07.12(토) ~ 25.07.13(일)",
        "서울 강남구 남부순환로 3104 SETEC 컨벤션센터(2층 전시실)",
        "https://www.replyalba.com/pt/xb6r0q6hwF"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/planon_sth/img/og.jpg",
        "서울 신혼여행 박람회",
        "25.07.19(토) ~ 25.07.20(일)",
        "서울 강남구 테헤란로 518 섬유센터 3F 이벤트홀",
        "https://www.replyalba.com/pt/QDLAahrhKi"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/planon_stwd/img/og.jpg",
        "서울 웨딩드레스 페어",
        "25.07.19(토) ~ 25.07.20(일)",
        "서울 강남구 테헤란로 518 섬유센터 3F 이벤트홀",
        "https://www.replyalba.com/pt/wX9TiOLFkf"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/comg0719/img/og.jpg",
        "웨덱스웨딩박람회 in 코엑스마곡",
        "25.07.19(토) ~ 25.07.20(일)",
        "서울 강서구 마곡중앙로 143 코엑스 마곡컨벤션 센터",
        "https://www.replyalba.com/pt/wX9TiNPWRz"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/wedcrowd_jslt/img/og.jpg",
        "잠실 롯데백화점 대형 웨딩박람회",
        "25.07.26(토) ~ 25.07.27(일)",
        "서울 송파구 올림픽로 240 10층 삼성스토어 특별행사장",
        "https://www.replyalba.com/pt/yeKnSM9p7Q"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/wedcrowd_swgg/img/og.jpg",
        "수원 갤러리아 광교 대형 웨딩박람회",
        "25.07.19(토) ~ 25.07.20(일)",
        "경기 수원시 영통구 광교중앙로 124 수원 갤러리아 백화점 특별 행사장",
        "https://www.replyalba.com/pt/wX9TiNLZJy"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/howto_sw/img/og.jpg",
        "수원 메쎄 하우투 웨딩박람회",
        "25.07.12(토) ~ 25.07.27(일)",
        "경기 수원시 권선구 세화로134번길 37 수원메쎄 특별전시장",
        "https://www.replyalba.com/pt/wX9TiJShhb"
    ],
    [
        "인천",
        "https://www.replyalba.com/intros/iwc_incheon/img/og.jpg",
        "IWC 인천 웨딩박람회",
        "25.07.01(화) ~ 25.07.31(목)",
        "인천 남동구 예술로 206 구월중앙프라자 3층 IWC인천웨딩컴퍼니",
        "https://www.replyalba.com/pt/wX9TiKHgRz"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/knn_centum/img/og.jpg",
        "부산 신세계 센텀점 W웨딩박람회",
        "25.07.12(토) ~ 25.07.20(일)",
        "부산광역시 해운대구 센텀남대로 35 신세계백화점 센텀시티점",
        "https://www.replyalba.com/pt/wX9TiO6KSu"
    ],
    [
        "대전",
        "https://www.replyalba.com/intros/wedcrowd_nc/img/og.jpg",
        "대전 NC백화점 대형 웨딩박람회",
        "25.07.12(토) ~ 25.07.13(일)",
        "대전 유성구 계룡로 119 NC백화점 유성점 7층 특별 행사장",
        "https://www.replyalba.com/pt/wX9TiKOjcG"
    ],
    [
        "일산",
        "https://www.replyalba.com/intros/wedcrowd_ls/img/og.jpg",
        "일산킨텍스 최대규모 대형 웨딩박람회",
        "25.07.12(토) ~ 25.07.13(일)",
        "경기 고양시 일산서구 킨텍스로 217-60 킨텍스 2전시장",
        "https://www.replyalba.com/pt/YQD7gsbIgG"
    ],
    [
        "청주",
        "https://www.replyalba.com/intros/revew_cj/img/og.jpg",
        "청주 최대규모 레브웨딩박람회",
        "25.07.19(토) ~ 25.07.20(일)",
        "충북 청주시 청원구 사천로17번길 37 LG전자베스트샵 율량점 특별행사장",
        "https://www.replyalba.com/pt/ZOP9E1eiSb"
    ],
    [
        "강릉",
        "https://www.replyalba.com/intros/revew_gn/img/og.jpg",
        "강릉 세인트존스 레브웨딩박람회",
        "25.07.12(토) ~ 25.07.13(일)",
        "강원도 강릉시 창해로 307 강릉세인트존스 호텔",
        "https://www.replyalba.com/pt/ElfnLbYMOt"
    ],
    [
        "일산",
        "https://www.replyalba.com/intros/withu_iskin/img/og.jpg",
        "일산 킨텍스 삼성 현대 위드유 웨딩박람회",
        "25.07.26(토) ~ 25.07.27(일)",
        "경기 고양시 일산서구 호수로 817 삼성스토어 현대 킨텍스 특별행사장",
        "https://www.replyalba.com/pt/QHh9OfHPTg"
    ],
    [
        "청주",
        "https://www.replyalba.com/intros/familytour_cj/img/og.jpg",
        "청주 OSCO 패밀리 웨딩박람회",
        "25.07.26(토) ~ 25.07.27(일)",
        "충북 청주시 흥덕구 오송읍 만수리 275-5 청주오스코 특별행사장",
        "https://www.replyalba.com/pt/TIaHT70Mjg"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/charles_gb/img/og.jpg",
        "부산 롯데백화점 광복점 웨딩박람회",
        "25.07.12(토) ~ 25.07.13(일)",
        "부산 중구 중앙대로 2 롯데백화점 광복점 9층(남포역 10번출구)",
        "https://www.replyalba.com/pt/T8UrWQqNBW"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/bwb0725/img/og.jpg",
        "BWB 부산 벡스코 웨딩박람회",
        "25.07.25(금) ~ 25.07.27(일)",
        "부산 해운대구 APEC로 30 벡스코 제 2전시장",
        "https://www.replyalba.com/pt/PzIEWMEJtR"
    ],
    [
        "천안",
        "https://www.replyalba.com/intros/withu_ca/img/og.jpg",
        "천안 위드유 웨딩박람회",
        "25.07.12(토) ~ 25.07.27(일)",
        "충남 천안시 서북구 부대3길 26 아일랜드유 특별행사장",
        "https://www.replyalba.com/pt/V77xCzXAG1"
    ],
    [
        "청주",
        "https://www.replyalba.com/intros/withu_cjj/img/og.jpg",
        "청주 위드유 웨딩박람회",
        "25.07.26(토) ~ 25.07.27(일)",
        "충북 청주시 서원구 1순환로 1138 LG전자베스트샵 남청주본점",
        "https://www.replyalba.com/pt/z84fQozgIw"
    ],
    [
        "천안",
        "https://www.replyalba.com/intros/iwc_cheonan/img/og.jpg",
        "IWC 천안 웨딩박람회",
        "25.07.01(화) ~ 25.07.31(목)",
        "충남 천안시 서북구 미라16길 18 IWC 천안 웨딩박람회",
        "https://www.replyalba.com/pt/PhwRxb44Ba"
    ]
];

  return {
    props: {
      sheetData,
    },
  };
}
