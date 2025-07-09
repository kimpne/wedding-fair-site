const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.js') && file !== 'index.js');

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // ✅ 상단 하드코딩 안내문 제거 (상위 <div className="top"> 블록 삭제)
  content = content.replace(/<div className="top">[\s\S]*?<\/div>\s*/, '');

  // ✅ HeaderNotice import 추가 (중복 방지)
  if (!content.includes("import HeaderNotice")) {
    content = content.replace(
      "import RegionTabs from '../components/RegionTabs';",
      "import RegionTabs from '../components/RegionTabs';\nimport HeaderNotice from '../components/HeaderNotice';"
    );
  }

  // ✅ HeaderNotice 컴포넌트 삽입 (RegionTabs 바로 위)
  content = content.replace(
    /(<main>[\s\S]*?<div className="container">)/,
    '<HeaderNotice />\n<RegionTabs />\n\n$1'
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${file} 수정 완료`);
});

console.log('\n🎉 모든 페이지에 HeaderNotice 자동 추가 완료');
