import Head from 'next/head';
import HeaderNotice from '../components/HeaderNotice';
import RegionTabs from '../components/RegionTabs';
import InternalLinks from '../components/InternalLinks';
import Link from 'next/link';

export default function haeundae({ sheetData }) {
  return (
    <>
      <Head>
        <title>해운대웨딩박람회 일정 안내 | 2025년 최신 업데이트</title>
        <meta name="description" content="해운대 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="keywords" content="해운대 웨딩박람회, 해운대 결혼박람회, 해운대 스드메" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://wdkor.co.kr/haeundae" />
        <meta property="og:title" content="해운대웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta property="og:description" content="해운대 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta property="og:url" content="https://wdkor.co.kr/haeundae" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="웨딩박람회 일정 총정리" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="해운대웨딩박람회 일정 안내 | 2025년 최신 업데이트" />
        <meta name="twitter:description" content="해운대 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요." />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "해운대웨딩박람회",
              "startDate": "2025-01-01",
              "location": {
                "@type": "Place",
                "name": "해운대 웨딩박람회 장소"
              },
              "description": "해운대 지역의 2025년 최신 웨딩박람회 일정과 장소, 혜택을 한눈에 확인하세요.",
              "url": "https://wdkor.co.kr/haeundae"
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
              2025 해운대 웨딩박람회
            </h1>
          </Link>

          {(() => {
            const currentRegionData = sheetData.filter((row) => row[0] === '해운대');
            const otherRegionData = sheetData.filter((row) => row[0] !== '해운대');
            
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
        "무료초대권 신청",
        "서울 강남구 남부순환로 3104 SETEC 컨벤션센터(2층 전시실)",
        "https://www.replyalba.com/pt/xb6r0q6hwF"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/planon_sth/img/og.jpg",
        "서울 신혼여행 박람회",
        "무료초대권 신청",
        "서울 강남구 테헤란로 518 섬유센터 3F 이벤트홀",
        "https://www.replyalba.com/pt/QDLAahrhKi"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/planon_stwd/img/og.jpg",
        "서울 웨딩드레스 페어",
        "무료초대권 신청",
        "서울 강남구 테헤란로 518 섬유센터 3F 이벤트홀",
        "https://www.replyalba.com/pt/wX9TiOLFkf"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/comg0719/img/og.jpg",
        "웨덱스웨딩박람회 in 코엑스마곡",
        "무료초대권 신청",
        "서울 강서구 마곡중앙로 143 코엑스 마곡컨벤션 센터",
        "https://www.replyalba.com/pt/wX9TiNPWRz"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/wedcrowd_jslt/img/og.jpg",
        "잠실 롯데백화점 대형 웨딩박람회",
        "무료초대권 신청",
        "서울 송파구 올림픽로 240 10층 삼성스토어 특별행사장",
        "https://www.replyalba.com/pt/yeKnSM9p7Q"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/wedcrowd_swgg/img/og.jpg",
        "수원 갤러리아 광교 대형 웨딩박람회",
        "무료초대권 신청",
        "경기 수원시 영통구 광교중앙로 124 수원 갤러리아 백화점 특별 행사장",
        "https://www.replyalba.com/pt/wX9TiNLZJy"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/howto_sw/img/og.jpg",
        "수원 메쎄 하우투 웨딩박람회",
        "무료초대권 신청",
        "경기 수원시 권선구 세화로134번길 37 수원메쎄 특별전시장",
        "https://www.replyalba.com/pt/wX9TiJShhb"
    ],
    [
        "인천",
        "https://www.replyalba.com/intros/iwc_incheon/img/og.jpg",
        "IWC 인천 웨딩박람회",
        "무료초대권 신청",
        "인천 남동구 예술로 206 구월중앙프라자 3층 IWC인천웨딩컴퍼니",
        "https://www.replyalba.com/pt/wX9TiKHgRz"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/knn_centum/img/og.jpg",
        "부산 신세계 센텀점 W웨딩박람회",
        "무료초대권 신청",
        "부산광역시 해운대구 센텀남대로 35 신세계백화점 센텀시티점",
        "https://www.replyalba.com/pt/wX9TiO6KSu"
    ],
    [
        "대전",
        "https://www.replyalba.com/intros/wedcrowd_nc/img/og.jpg",
        "대전 NC백화점 대형 웨딩박람회",
        "무료초대권 신청",
        "대전 유성구 계룡로 119 NC백화점 유성점 7층 특별 행사장",
        "https://www.replyalba.com/pt/wX9TiKOjcG"
    ],
    [
        "일산",
        "https://www.replyalba.com/intros/wedcrowd_ls/img/og.jpg",
        "일산킨텍스 최대규모 대형 웨딩박람회",
        "무료초대권 신청",
        "경기 고양시 일산서구 킨텍스로 217-60 킨텍스 2전시장",
        "https://www.replyalba.com/pt/YQD7gsbIgG"
    ],
    [
        "청주",
        "https://www.replyalba.com/intros/revew_cj/img/og.jpg",
        "청주 최대규모 레브웨딩박람회",
        "무료초대권 신청",
        "충북 청주시 청원구 사천로17번길 37 LG전자베스트샵 율량점 특별행사장",
        "https://www.replyalba.com/pt/ZOP9E1eiSb"
    ],
    [
        "강릉",
        "https://www.replyalba.com/intros/revew_gn/img/og.jpg",
        "강릉 세인트존스 레브웨딩박람회",
        "무료초대권 신청",
        "강원도 강릉시 창해로 307 강릉세인트존스 호텔",
        "https://www.replyalba.com/pt/ElfnLbYMOt"
    ],
    [
        "일산",
        "https://www.replyalba.com/intros/withu_iskin/img/og.jpg",
        "일산 킨텍스 삼성 현대 위드유 웨딩박람회",
        "무료초대권 신청",
        "경기 고양시 일산서구 호수로 817 삼성스토어 현대 킨텍스 특별행사장",
        "https://www.replyalba.com/pt/QHh9OfHPTg"
    ],
    [
        "청주",
        "https://www.replyalba.com/intros/familytour_cj/img/og.jpg",
        "청주 OSCO 패밀리 웨딩박람회",
        "무료초대권 신청",
        "충북 청주시 흥덕구 오송읍 만수리 275-5 청주오스코 특별행사장",
        "https://www.replyalba.com/pt/TIaHT70Mjg"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/charles_gb/img/og.jpg",
        "부산 롯데백화점 광복점 웨딩박람회",
        "무료초대권 신청",
        "부산 중구 중앙대로 2 롯데백화점 광복점 9층(남포역 10번출구)",
        "https://www.replyalba.com/pt/T8UrWQqNBW"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/bwb0725/img/og.jpg",
        "BWB 부산 벡스코 웨딩박람회",
        "무료초대권 신청",
        "부산 해운대구 APEC로 30 벡스코 제 2전시장",
        "https://www.replyalba.com/pt/PzIEWMEJtR"
    ],
    [
        "천안",
        "https://www.replyalba.com/intros/withu_ca/img/og.jpg",
        "천안 위드유 웨딩박람회",
        "무료초대권 신청",
        "충남 천안시 서북구 부대3길 26 아일랜드유 특별행사장",
        "https://www.replyalba.com/pt/V77xCzXAG1"
    ],
    [
        "청주",
        "https://www.replyalba.com/intros/withu_cjj/img/og.jpg",
        "청주 위드유 웨딩박람회",
        "무료초대권 신청",
        "충북 청주시 서원구 1순환로 1138 LG전자베스트샵 남청주본점",
        "https://www.replyalba.com/pt/z84fQozgIw"
    ],
    [
        "천안",
        "https://www.replyalba.com/intros/iwc_cheonan/img/og.jpg",
        "IWC 천안 웨딩박람회",
        "무료초대권 신청",
        "충남 천안시 서북구 미라16길 18 IWC 천안 웨딩박람회",
        "https://www.replyalba.com/pt/PhwRxb44Ba"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/wedcrowd_sohd/img/og.jpg",
        "더현대 서울 대형 웨딩박람회",
        "무료초대권 신청",
        "서울 영등포구 여의대로 108 더현대 서울 5층 삼성 메가스토어 특별전시장",
        "https://www.replyalba.com/pt/JO1EwgPxoL"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/wedcrowd_ys/img/og.jpg",
        "용산 아이파크몰 대형 웨딩박람회",
        "무료초대권 신청",
        "서울 용산구 한강대로23길 55 용산 아이파크몰 리빙파크 3F",
        "https://www.replyalba.com/pt/Zy39ipPdTJ"
    ],
    [
        "천안",
        "https://www.replyalba.com/intros/wedcrowd_ca/img/og.jpg",
        "천안 갤러리아 대형 웨딩박람회",
        "무료초대권 신청",
        "충남 천안시 서북구 공원로 227 갤러리아백화점 센터시티점 7F 특별전시장",
        "https://www.replyalba.com/pt/11iP1BmoPL2"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/wedcrowd_swms/img/og.jpg",
        "수원메쎄 대형 웨딩박람회",
        "무료초대권 신청",
        "경기 수원시 권선구 세화로134번길 37 수원 메쎄 전시장",
        "https://www.replyalba.com/pt/Fg835DvBvL"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/wedcrowd_swf/img/og.jpg",
        "서울 웨딩페어",
        "무료초대권 신청",
        "서울 영등포구 영중로 9 신세계백화점 타임스퀘어점 3층 삼성스토어 특별행사장",
        "https://www.replyalba.com/pt/wX9TiOeUfj"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/cowed0726/img/og.jpg",
        "삼성역 코엑스 웨딩페어",
        "무료초대권 신청",
        "서울 강남구 삼성동 159, 코엑스",
        "https://www.replyalba.com/pt/CTND8aZo1U"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/wwcity/img/og.jpg",
        "부산 W웨딩시티 웨딩박람회",
        "무료초대권 신청",
        "부산광역시 부산진구 자유평화로 11 W웨딩시티",
        "https://www.replyalba.com/pt/wX9TiOtW3c"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/cowed0719/img/og.jpg",
        "강남코엑스 원조 웨덱스 웨딩박람회",
        "무료초대권 신청",
        "서울 강남구 삼성동 159, 코엑스",
        "https://www.replyalba.com/pt/wX9TiOyIjT"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/bwc24/img/og.jpg",
        "BWC 부산 벡스코 웨딩박람회",
        "무료초대권 신청",
        "부산 해운대구 APEC로 30 벡스코 제 2전시장 1층 4B홀",
        "https://www.replyalba.com/pt/OptFkiTqBu"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/charles_land/img/og.jpg",
        "KNN 부산 웨딩 박람회",
        "무료초대권 신청",
        "부산 해운대구 센텀서로 30 KNN방송국 특별행사장",
        "https://www.replyalba.com/pt/wX9TiMR42J"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/howto_setec/img/og.jpg",
        "SETEC 웨딩박람회",
        "무료초대권 신청",
        "서울 강남구 남부순환로 3104 SETEC 2층",
        "https://www.replyalba.com/pt/wX9TiNheQF"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/lala_gs/img/og.jpg",
        "가산 웨딩혼수 웨딩홀 박람회",
        "무료초대권 신청",
        "서울 금천구 벚꽃로 266 3관 8층 롯데하이마트 마리오아울렛점",
        "https://www.replyalba.com/pt/DM7xYbB0pF"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/gaudi/img/og.jpg",
        "가우디웨딩 수원토탈샵",
        "무료초대권 신청",
        "경기 수원시 팔달구 경수대로 442 G타워 5층 가우디웨딩 수원점",
        "https://www.replyalba.com/pt/wX9TiLpBgo"
    ],
    [
        "광주",
        "https://www.replyalba.com/intros/gjwshow/img/og.jpg",
        "광주 김대중컨벤션센터 웨딩 SHOW",
        "무료초대권 신청",
        "광주광역시 서구 상무누리로 30 김대중컨벤션센터",
        "https://www.replyalba.com/pt/yeKnSMiTyj"
    ],
    [
        "광주",
        "https://www.replyalba.com/intros/gjstyling/img/og.jpg",
        "광주스타일링페어",
        "무료초대권 신청",
        "광주 동구 서석로 13-1 더베스트사옥",
        "https://www.replyalba.com/pt/IoB1YJYIMa"
    ],
    [
        "김해",
        "https://www.replyalba.com/intros/w_ghssg/img/og.jpg",
        "김해 더파티 웨딩홀 웨딩박람회",
        "무료초대권 신청",
        "경남 김해시 김해대로 2342 김해 더파티 웨딩홀 벨리스홀",
        "https://www.replyalba.com/pt/OptFkj7N38"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/wedcrowd_nwlt/img/og.jpg",
        "노원 롯데백화점 대형 웨딩박람회",
        "무료초대권 신청",
        "서울 노원구 동일로 1414 롯데백화점 7층 삼성스토어 특별행사장",
        "https://www.replyalba.com/pt/wX9TiJEvsX"
    ],
    [
        "대구",
        "https://www.replyalba.com/intros/ktop_daegu/img/og.jpg",
        "대구 반하나 웨딩박람회",
        "무료초대권 신청",
        "대구 중구 달구벌대로 2077 6층 LG전자베스트샵 더현대대구점",
        "https://www.replyalba.com/pt/EwI0rzdeYG"
    ],
    [
        "대구",
        "https://www.replyalba.com/intros/wmatching_dg/img/og.jpg",
        "대구 반하나 웨딩홀 매칭",
        "무료초대권 신청",
        "대구 봉덕로9길 115 5층 반하나웨딩",
        "https://www.replyalba.com/pt/Ls2xHTOk0I"
    ],
    [
        "인천",
        "https://www.replyalba.com/intros/rachel_ic/img/og.jpg",
        "레이첼 인천 웨딩박람회",
        "무료초대권 신청",
        "인천 남동구 아암대로 1085 1, 2층 영림홈앤리빙 인천",
        "https://www.replyalba.com/pt/wX9TiKlYfH"
    ],
    [
        "인천",
        "https://www.replyalba.com/intros/rococo/img/og.jpg",
        "로코코 웨딩드레스 초대전",
        "무료초대권 신청",
        "인천 남동구 구월남로 117 가주프라자 6층 로코코웨딩",
        "https://www.replyalba.com/pt/wX9TiLsRqf"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/charles_gb2/img/og.jpg",
        "롯데백화점 부산본점 웨딩엑스포",
        "무료초대권 신청",
        "부산 부산진구 가야대로 772 롯데백화점 부산본점 10층",
        "https://www.replyalba.com/pt/wX9TiNMiNM"
    ],
    [
        "광주",
        "https://www.replyalba.com/intros/veluce/img/og.jpg",
        "베루체 초대전",
        "무료초대권 신청",
        "광주 동구 서석로 23 1층 베루체 광주점(불로동)",
        "https://www.replyalba.com/pt/Ls2xHP8BuB"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/charles_db/img/og.jpg",
        "부산 더블혜택 웨딩박람회",
        "무료초대권 신청",
        "부산 부산진구 황령대로 13 한라시그마타워 1F",
        "https://www.replyalba.com/pt/wX9TiOXHkr"
    ],
    [
        "부산",
        "https://www.replyalba.com/intros/charles2/img/og.jpg",
        "부산 찰스 웨딩박람회",
        "무료초대권 신청",
        "부산광역시 부산진구 황령대로 13 한라시그마타워 1F",
        "https://www.replyalba.com/pt/wX9TiMeNWL"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/withu_bcss/img/og.jpg",
        "부천 위드유 웨딩박람회",
        "무료초대권 신청",
        "경기 부천시 원미구 길주로 300 롯데백화점 중동점 9층 삼성스토어",
        "https://www.replyalba.com/pt/wX9TiN4g5R"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/withu_sobg/img/og.jpg",
        "서울 불광본점 위드유 웨딩박람회",
        "무료초대권 신청",
        "서울 은평구 불광로 41 LG전자베스트샵 불광본점",
        "https://www.replyalba.com/pt/wX9TiOuxA5"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/planon_stwh/img/og.jpg",
        "서울 웨딩홀 박람회",
        "무료초대권 신청",
        "서울 강남구 테헤란로 518 섬유센터 3F 이벤트홀",
        "https://www.replyalba.com/pt/wX9TiLkMcL"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/st_whf/img/og.jpg",
        "세텍 웨딩홀 페어",
        "무료초대권 신청",
        "서울 강남구 남부순환로 3104 SETEC 컨벤션센터(2층 전시실)",
        "https://www.replyalba.com/pt/wX9TiKcnk2"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/st_hnf/img/og.jpg",
        "세텍 허니문 페어",
        "무료초대권 신청",
        "서울 강남구 남부순환로 3104 SETEC 컨벤션센터(2층 전시실)",
        "https://www.replyalba.com/pt/wX9TiN7ljD"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/paris_swak/img/og.jpg",
        "수원 AK플라자 웨딩박람회",
        "무료초대권 신청",
        "경기 수원시 팔달구 덕영대로 924 AK플라자 수원",
        "https://www.replyalba.com/pt/wX9TiOY67C"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/paris_swwt/img/og.jpg",
        "수원 웨딩거리 웨딩박람회",
        "무료초대권 신청",
        "경기 수원시 팔달구 효원로 62, 수원웨딩만들기 웨딩타운 전층",
        "https://www.replyalba.com/pt/wX9TiNWjMF"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/paris_swlt0504/img/og.jpg",
        "수원 타임빌라스 웨딩박람회",
        "무료초대권 신청",
        "경기 수원시 권선구 세화로 134 롯데백화점 수원점 B1 특별행사장",
        "https://www.replyalba.com/pt/wX9TiM3Ltw"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/wedcrowd_sw/img/og.jpg",
        "수원컨벤션센터 초대형 웨딩박람회",
        "무료초대권 신청",
        "경기 수원시 영통구 광교중앙로 140 수원컨벤션센터 1F",
        "https://www.replyalba.com/pt/wX9TiN5COp"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/paris_total/img/og.jpg",
        "수원토탈샵 라벨르엘린 스드메 상담예약",
        "무료초대권 신청",
        "경기 수원시 팔달구 효원로 62 3층",
        "https://www.replyalba.com/pt/wX9TiOK33B"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/wedcrowd_pc/img/og.jpg",
        "안양 롯데백화점 평촌 웨딩박람회",
        "무료초대권 신청",
        "경기 안양시 동안구 시민대로 180 롯데백화점 평촌점 특별전시장",
        "https://www.replyalba.com/pt/wX9TiJLHu5"
    ],
    [
        "울산",
        "https://www.replyalba.com/intros/wwed_us/img/og.jpg",
        "울산 W웨딩 웨딩박람회",
        "무료초대권 신청",
        "울산 남구 삼산로 261 현대백화점 울산점 12층",
        "https://www.replyalba.com/pt/wX9TiJJ5Dm"
    ],
    [
        "울산",
        "https://www.replyalba.com/intros/w_ltus/img/og.jpg",
        "울산 롯데백화점 웨딩박람회",
        "무료초대권 신청",
        "울산 남구 삼산로 288 롯데백화점 울산점 특별행사장 B1",
        "https://www.replyalba.com/pt/wX9TiKdxiH"
    ],
    [
        "원주",
        "https://www.replyalba.com/intros/withu_wjss/img/og.jpg",
        "원주 삼성스토어 위드유 웨딩박람회",
        "무료초대권 신청",
        "강원도 원주시 북원로 2384 삼성스토어 단계",
        "https://www.replyalba.com/pt/wX9TiOxKPS"
    ],
    [
        "제주",
        "https://www.replyalba.com/intros/shirley_wctjj/img/og.jpg",
        "월컨투 제주 허니문박람회",
        "무료초대권 신청",
        "제주도 제주시 연북로 424 비비드블랑(제주점) 3층",
        "https://www.replyalba.com/pt/Ls2xHRepCc"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/wplus_ydp/img/og.jpg",
        "웨딩더하기 영등포 신세계 타임스퀘어 웨딩박람회",
        "무료초대권 신청",
        "서울 영등포구 영중로 9 신세계백화점 타임스퀘어점 리빙관 3층 LG베스트샵 행사장",
        "https://www.replyalba.com/pt/wX9TiKEcPH"
    ],
    [
        "대구",
        "https://www.replyalba.com/intros/wedding_haram2/img/og.jpg",
        "대구 웨딩하람 웨딩박람회",
        "무료초대권 신청",
        "대구광역시 중구 공평로59 (우원빌딩) 59 2층",
        "https://www.replyalba.com/pt/Ls2xHSRyJR"
    ],
    [
        "인천",
        "https://www.replyalba.com/intros/wedcrowd_icsd/img/og.jpg",
        "인천 송도컨벤시아 대형 웨딩박람회",
        "무료초대권 신청",
        "인천 연수구 센트럴로 123 송도컨벤시아",
        "https://www.replyalba.com/pt/wX9TiJbikB"
    ],
    [
        "인천",
        "https://www.replyalba.com/intros/hihnm_ic/img/og.jpg",
        "인천 하이허니문",
        "무료초대권 신청",
        "인천 남동구 예술로 206 중앙프라자 A동 3층",
        "https://www.replyalba.com/pt/wX9TiLG1xU"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/wedcrowd_jslt/img/og.jpg",
        "잠실 롯데백화점 대형 웨딩박람회",
        "무료초대권 신청",
        "서울 송파구 올림픽로 240 10층 삼성스토어 특별행사장",
        "https://www.replyalba.com/pt/yeKnSM9p7Q"
    ],
    [
        "창원",
        "https://www.replyalba.com/intros/cw_wedding/img/og.jpg",
        "창원 롯데백화점 웨딩박람회",
        "무료초대권 신청",
        "경남 창원시 성산구 중앙대로 124 롯데백화점 창원점 지하 1층 삼성스토어",
        "https://www.replyalba.com/pt/Ls2xHQ8gyZ"
    ],
    [
        "창원",
        "https://www.replyalba.com/intros/wmatching_cw/img/og.jpg",
        "창원 반하나 웨딩홀 매칭",
        "무료초대권 신청",
        "창원 마디미서로30 2층 반하나웨딩",
        "https://www.replyalba.com/pt/Ls2xHRsEFQ"
    ],
    [
        "창원",
        "https://www.replyalba.com/intros/cwonfair/img/og.jpg",
        "창원 최대규모 웨딩박람회",
        "무료초대권 신청",
        "경남 창원시 성산구 중앙대로100번길 13 LG전자베스트샵 상남본점 특별행사장",
        "https://www.replyalba.com/pt/Ls2xHRwVjn"
    ],
    [
        "창원",
        "https://www.replyalba.com/intros/cw_wedding2/img/og.jpg",
        "창원 프리마베라 웨딩박람회",
        "무료초대권 신청",
        "경상남도 창원시 성산구 용지로 112 중앙동 프리마베라",
        "https://www.replyalba.com/pt/wX9TiLFfc8"
    ],
    [
        "천안",
        "https://www.replyalba.com/intros/terracehill/img/og.jpg",
        "천안 테라스힐",
        "무료초대권 신청",
        "충남 천안시 서북구 미라16길 18 테라스힐",
        "https://www.replyalba.com/pt/wX9TiLEcp4"
    ],
    [
        "천안",
        "https://www.replyalba.com/intros/hihnm_ca/img/og.jpg",
        "천안 하이허니문",
        "무료초대권 신청",
        "충남 천안시 동남구 서부대로 540 1층 하이허니문 천안점",
        "https://www.replyalba.com/pt/wX9TiMhWR9"
    ],
    [
        "전주",
        "https://www.replyalba.com/intros/cdstory/img/og.jpg",
        "전주 청담스토리 웨딩초대전",
        "무료초대권 신청",
        "전라북도 전주시 완산구 효자동3가 1527-15",
        "https://www.replyalba.com/pt/wX9TiJiQ1t"
    ],
    [
        "인천",
        "https://www.replyalba.com/intros/higher_ic/img/og.jpg",
        "인천 초대형 하이어 웨딩박람회",
        "무료초대권 신청",
        "인천 미추홀구 매소홀로 618 문학경기장(그랜드오스티엄) 특별행사장",
        "https://www.replyalba.com/pt/wX9TiNsu2J"
    ],
    [
        "춘천",
        "https://www.replyalba.com/intros/withu_cc/img/og.jpg",
        "춘천 위드유 웨딩박람회",
        "무료초대권 신청",
        "강원도 춘천시 춘천로 18 LG전자베스트샵 춘천퇴계점",
        "https://www.replyalba.com/pt/yeKnSOrjp9"
    ],
    [
        "제주",
        "https://www.replyalba.com/intros/bbdeblanc/img/og.jpg",
        "한국웨딩연합회 주관 제 12회 제주 웨딩박람회",
        "무료초대권 신청",
        "제주 제주시 연북로 424 3층 비비드블랑",
        "https://www.replyalba.com/pt/Ls2xHTlJGx"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/planon_hdirect/img/og.jpg",
        "허니문 직거래 박람회",
        "무료초대권 신청",
        "서울 강남구 테헤란로 518 섬유센터 3층 이벤트홀",
        "https://www.replyalba.com/pt/wX9TiK0qc8"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/wedcrowd_pg/img/og.jpg",
        "현대백화점 판교점 웨딩박람회",
        "무료초대권 신청",
        "경기 성남시 분당구 판교역로146번길 20 7층 삼성스토어 특별전시장",
        "https://www.replyalba.com/pt/wX9TiMGbPy"
    ],
    [
        "서울",
        "https://www.replyalba.com/intros/withu_gs/img/og.jpg",
        "서울 강서본점 위드유 웨딩박람회",
        "무료초대권 신청",
        "서울 강서구 공항대로 431 LG전자베스트샵 강서본점 특별행사장",
        "https://www.replyalba.com/pt/wX9TiKniEx"
    ],
    [
        "경기",
        "https://www.replyalba.com/intros/familytour_sw/img/og.jpg",
        "수원 패밀리 웨딩박람회",
        "무료초대권 신청",
        "경기 수원시 영통구 광교중앙로 140 수원컨벤션센터 특별행사장",
        "https://www.replyalba.com/pt/wX9TiKu92a"
    ]
];

  return {
    props: {
      sheetData,
    },
  };
}
