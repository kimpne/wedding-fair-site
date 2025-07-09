const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

const targetFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('-wedding-fair.js'));

targetFiles.forEach((file) => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // ✅ 하드코딩된 탭 메뉴 블록 제거
  const tabMenuPattern = /<div className="tabmenu">[\s\S]*?<\/div>/g;
  content = content.replace(tabMenuPattern, '<RegionTabs />');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ 수정 완료: ${file}`);
});

console.log('🎉 모든 지역 페이지에서 하드코딩 탭 삭제 완료!');
