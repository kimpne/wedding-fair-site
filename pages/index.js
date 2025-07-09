import Head from "next/head";
import Link from "next/link";

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

      <header
        style={{
          padding: "20px",
          background: "#f8f8f8",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h1 style={{ fontSize: "24px" }}>2025 전국 웨딩 박람회 일정</h1>
        <p style={{ fontSize: "14px", color: "#555" }}>
          매주 업데이트되는 전국 웨딩/허니문 박람회 일정
        </p>
        <p style={{ fontSize: "14px", color: "#555" }}>
          모든 박람회는 중복 신청이 가능합니다
        </p>
      </header>

      <main>
        <div className="container" style={{ padding: "30px" }}>
          <h2 style={{ marginBottom: "20px" }}>원하는 지역을 선택하세요</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {regions.map((region) => (
              <li key={region.path} style={{ marginBottom: "15px" }}>
                <Link href={`/${region.path}`} legacyBehavior>
                  <a
                    style={{
                      fontSize: "18px",
                      color: "#E91E63",
                      fontWeight: "500",
                      textDecoration: "none",
                      display: "inline-block",
                      padding: "10px 15px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  >
                    {region.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
