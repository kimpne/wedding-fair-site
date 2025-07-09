import Link from 'next/link';

export default function HeaderNotice() {
  return (
    <div className="header-notice">
      <h1>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          2025 웨딩 박람회 일정
        </Link>
      </h1>
      <p>매주 업데이트되는 전국 웨딩/허니문 박람회 일정</p>
      <p>모든 박람회는 중복 신청이 가능하며 박람회별 특별한 혜택을 놓치지 마세요!</p>
    </div>
  );
}
