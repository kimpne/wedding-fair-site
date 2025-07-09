const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages'); // ✅ 'pages' 경로
const regionFiles = fs.readdirSync(pagesDir).filter((file) => file.endsWith('-wedding-fair.js'));

regionFiles.forEach((file) => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // ✅ 모든 <RegionTabs /> 제거
  const removedTabs = content.replace(/<RegionTabs\s*\/>\n*/g, '');

  // ✅ 첫 번째 <HeaderNotice /> 바로 뒤에 딱 1개 삽입 (보장)
  const fixedContent = removedTabs.replace(
    /<HeaderNotice\s*\/>/,
    `<HeaderNotice />\n<RegionTabs />`
  );

  fs.writeFileSync(filePath, fixedContent, 'utf-8');
  console.log(`✅ RegionTabs 정리 완료: ${file}`);
});

console.log('🎉 모든 지역 페이지 RegionTabs 중복 제거 완료!');
