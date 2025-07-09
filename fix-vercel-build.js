
const fs = require('fs');
const path = require('path');

const regions = [
  'seoul-wedding-fair',
  'busan-wedding-fair',
  'daejeon-wedding-fair',
  'incheon-wedding-fair',
  'ilsan-wedding-fair',
  'suwon-wedding-fair',
  'ulsan-wedding-fair',
  'jeolla-wedding-fair',
  'gyeonggi-wedding-fair'
];

regions.forEach(region => {
  const filePath = path.join(__dirname, 'pages', `${region}.js`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 파일 없음: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // getServerSideProps 부분을 API 호출로 변경
  const getServerSidePropsRegex = /export async function getServerSideProps\(\) \{[\s\S]*?\n\}/;
  
  const newGetServerSideProps = `export async function getServerSideProps() {
  try {
    const response = await fetch(\`\${process.env.VERCEL_URL || 'http://localhost:3000'}/api/sheet-data\`);
    const sheetData = await response.json();

    return {
      props: {
        sheetData: Array.isArray(sheetData) ? sheetData : [],
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        sheetData: [],
      },
    };
  }
}`;

  content = content.replace(getServerSidePropsRegex, newGetServerSideProps);

  // 데이터 접근 부분 안전하게 수정
  content = content.replace(
    /href=\{row\[5\]\}/g,
    'href={row[5] || "#"}'
  );
  
  content = content.replace(
    /src=\{row\[1\]\}/g,
    'src={row[1] || "/placeholder.jpg"}'
  );
  
  content = content.replace(
    /alt=\{row\[2\]\}/g,
    'alt={row[2] || "웨딩박람회"}'
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ 수정 완료: ${region}.js`);
});

console.log('🎉 모든 페이지 Vercel 빌드 오류 수정 완료!');
