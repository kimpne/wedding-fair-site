const fs = require('fs');
const path = require('path');

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

const tabMenu = `
<div className="top">
  <h1>2025 웨딩 박람회 일정</h1>
  <p>매주 업데이트되는 전국 웨딩/허니문 박람회 일정<br />
    모든 박람회는 중복 신청이 가능하며 박람회별 특별한 혜택을 놓치지 마세요!</p>
</div>

<div className="tabmenu">
  <ul>
    ${regions.map(region => `
    <li><a href="/${region.path}">${region.name}</a></li>`).join('')}
  </ul>
</div>
`;

regions.forEach(region => {
  const filePath = path.join(__dirname, 'pages', `${region.path}.js`);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 파일 없음: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // ✅ 메뉴 및 탭메뉴 각각 삭제 (네 구조 맞춤)
  content = content.replace(/<div className="top">[\s\S]*?<\/div>\s*/g, '');
  content = content.replace(/<div className="tabmenu">[\s\S]*?<\/div>\s*/g, '');

  // ✅ 메뉴 삽입
  content = content.replace(
    /<main>/,
    `${tabMenu}\n\n<main>`
  );

  // ✅ 지역명 맞춰서 필터 및 h2 수정
  content = content.replace(
    /\.filter\(\(row\) => row\[0\] === '.*?'\)/,
    `.filter((row) => row[0] === '${region.name}')`
  );

  content = content.replace(
    /<h1>.*?<\/h1>/,
    `<h1>${region.name}웨딩박람회 일정 안내</h1>`
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ 수정 완료: ${region.path}.js`);
});

console.log('🎉 모든 작업 완료');
