import Link from 'next/link';
import { useRouter } from 'next/router';

const regions = [
  { name: '서울', path: 'seoul-wedding-fair' },
  { name: '경기', path: 'gyeonggi-wedding-fair' },
  { name: '인천', path: 'incheon-wedding-fair' },
  { name: '부산', path: 'busan-wedding-fair' },
  { name: '대전', path: 'daejeon-wedding-fair' },
  { name: '전라도', path: 'jeolla-wedding-fair' },
  { name: '광주', path: 'gwangju-wedding-fair' },
  { name: '울산', path: 'ulsan-wedding-fair' },
  { name: '일산', path: 'ilsan-wedding-fair' },
  { name: '수원', path: 'suwon-wedding-fair' },
];

export default function RegionTabs() {
  const router = useRouter();
  const currentPath = router.pathname.replace('/', '');

  return (
    <div className="tabmenu">
      <ul>
        {regions.map((region) => (
          <li key={region.path} className={currentPath === region.path ? 'active' : ''}>
            <Link href={`/${region.path}`}>{region.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
