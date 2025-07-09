const fs = require('fs');
const path = require('path');

const regions = [
  'seoul-wedding-fair',
  'gyeonggi-wedding-fair',
  'incheon-wedding-fair',
  'busan-wedding-fair',
  'daejeon-wedding-fair',
  'jeolla-wedding-fair',
  'gwangju-wedding-fair',
  'ulsan-wedding-fair',
  'ilsan-wedding-fair',
  'suwon-wedding-fair',
];

regions.forEach((region) => {
  const filePath = path.join(__dirname, 'pages', `${region}.js`);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 파일 없음: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // ✅ a 태그 미닫힘 패턴 자동 수정 (ul > li 내부)
  const fixedContent = content.replace(
    /(<a [\s\S]*?>[\s\S]*?<div>[\s\S]*?<\/div>)(?![\s\S]*?<\/a>)/g,
    `$1\n</a>`
  );

  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent, 'utf-8');
    console.log(`✅ 자동 수정 완료: ${region}.js`);
  } else {
    console.log(`⚠️ 수정 불필요 (패스): ${region}.js`);
  }
});

console.log('\n🎉 모든 a 태그 자동 수정 완료');
