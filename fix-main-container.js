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

regions.forEach(region => {
  const filePath = path.join(__dirname, 'pages', `${region}.js`);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 파일 없음: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // 🔥 <main> 내부 구조 정리 (불필요한 div 제거)
  const mainRegex = /<main>([\s\S]*?)<\/main>/;
  const mainMatch = content.match(mainRegex);

  if (mainMatch) {
    const mainContent = mainMatch[1];

    // <div className="container">만 남기고 다른 div 제거
    const containerRegex = /<div className="container">[\s\S]*?<\/div>/;
    const containerMatch = mainContent.match(containerRegex);

    if (containerMatch) {
      const cleanMain = `<main>\n  ${containerMatch[0]}\n</main>`;
      content = content.replace(mainRegex, cleanMain);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ 구조 정리 완료: ${region}.js`);
    } else {
      console.log(`⚠️ container 구조 없음 (패스): ${region}.js`);
    }
  } else {
    console.log(`⚠️ <main> 태그 없음 (패스): ${region}.js`);
  }
});

console.log('\n🎉 모든 파일 구조 자동 정리 완료');
