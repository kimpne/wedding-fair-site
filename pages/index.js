import Head from "next/head";
import Link from "next/link";
import HeaderNotice from "../components/HeaderNotice";

const regions = [
  { name: "서울웨딩박람회", path: "seoul-wedding-fair" },
  { name: "경기도웨딩박람회", path: "gyeonggi-wedding-fair" },
  { name: "인천웨딩박람회", path: "incheon-wedding-fair" },
  { name: "부산웨딩박람회", path: "busan-wedding-fair" },
  { name: "대전웨딩박람회", path: "daejeon-wedding-fair" },
  { name: "수원웨딩박람회", path: "suwon-wedding-fair" },
  { name: "전라도웨딩박람회", path: "jeolla-wedding-fair" },
  { name: "광주웨딩박람회", path: "gwangju-wedding-fair" },
  { name: "울산웨딩박람회", path: "ulsan-wedding-fair" },
  { name: "일산웨딩박람회", path: "ilsan-wedding-fair" },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>2025 전국 웨딩박람회 일정 총정리 | 최신 박람회 정보</title>
        <meta
          name="description"
          content="2025년 전국 웨딩박람회 일정을 한눈에 확인하세요! 서울, 경기, 부산, 인천, 대전 등 지역별 박람회 일정 모음."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNotice />

      <main>
        <div className="container" style={{ padding: "40px 20px" }}>
          <h2 style={{ 
            textAlign: "center", 
            marginBottom: "30px", 
            fontSize: "24px",
            color: "#333"
          }}>
            원하는 지역을 선택하세요
          </h2>
          <div className="region-grid">
            {regions.map((region) => (
              <Link
                key={region.path}
                href={`/${region.path}`}
                className="region-card"
              >
                {region.name}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        .region-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        .region-card {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: #fafafa;
          border: 2px solid #ddd;
          border-radius: 12px;
          text-decoration: none;
          color: #E91E63;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          min-height: 80px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .region-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(233, 30, 99, 0.2);
          border-color: #E91E63;
          background: #f0f0f0;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .region-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .region-card {
            min-height: 60px;
            font-size: 15px;
            padding: 15px;
          }
        }
      `}</style>
    </>
  );
}
