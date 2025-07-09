import Link from 'next/link';

const regions = [
  { name: '서울웨딩박람회', path: 'seoul-wedding-fair' },
  { name: '경기도웨딩박람회', path: 'gyeonggi-wedding-fair' },
  { name: '대전웨딩박람회', path: 'daejeon-wedding-fair' },
  { name: '인천웨딩박람회', path: 'incheon-wedding-fair' },
  { name: '부산웨딩박람회', path: 'busan-wedding-fair' },
  { name: '수원웨딩박람회', path: 'suwon-wedding-fair' },
  { name: '전라도웨딩박람회', path: 'jeolla-wedding-fair' },
  { name: '광주웨딩박람회', path: 'gwangju-wedding-fair' },
  { name: '울산웨딩박람회', path: 'ulsan-wedding-fair' },
  { name: '일산웨딩박람회', path: 'ilsan-wedding-fair' },
];

export default function InternalLinks() {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>다른 지역 웨딩박람회 보기</h2>
      <ul>
        {regions.map((region) => (
          <li key={region.path}>
            <Link href={`/${region.path}`}>{region.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
