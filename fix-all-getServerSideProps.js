
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

const newGetServerSideProps = `export async function getServerSideProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'wedding-fair-data.json');
    
    if (!fs.existsSync(jsonPath)) {
      return {
        props: {
          sheetData: [],
        },
      };
    }
    
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const sheetData = JSON.parse(jsonData);

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

regions.forEach(region => {
  const filePath = path.join(__dirname, 'pages', `${region}.js`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 파일 없음: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // getServerSideProps 함수 전체를 새 버전으로 교체
  const getServerSidePropsRegex = /export async function getServerSideProps\(\) \{[\s\S]*?\n\}/;
  
  if (getServerSidePropsRegex.test(content)) {
    content = content.replace(getServerSidePropsRegex, newGetServerSideProps);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ 수정 완료: ${region}.js`);
  } else {
    console.log(`❌ getServerSideProps 함수를 찾을 수 없음: ${region}.js`);
  }
});

console.log('🎉 모든 페이지 getServerSideProps 수정 완료!');
