
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

regions.forEach(region => {
  const filePath = path.join(__dirname, 'pages', `${region.path}.js`);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 파일 없음: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix syntax errors - remove malformed expressions
  content = content.replace(/}w\[\d+\]}/g, (match) => {
    const number = match.match(/\d+/)[0];
    return `{row[${number}]}`;
  });

  // Fix sheetData handling - ensure it's always an array
  content = content.replace(
    /export default function [^{]*\{ sheetData \}/,
    (match) => {
      const functionName = match.match(/function ([^{]*)/)[1].trim();
      return `export default function ${functionName}{ sheetData }) {
  // Ensure sheetData is always an array
  const safeSheetData = Array.isArray(sheetData) ? sheetData : [];`;
    }
  );

  // Replace sheetData with safeSheetData in filter operations
  content = content.replace(/sheetData\s*\.filter/g, 'safeSheetData.filter');

  // Fix getServerSideProps error handling
  content = content.replace(
    /export async function getServerSideProps\(\) \{[\s\S]*?\}/,
    `export async function getServerSideProps() {
  const { getSheetData } = require('../lib/sheet');
  
  try {
    const sheetData = await getSheetData();
    return {
      props: {
        sheetData: Array.isArray(sheetData) ? sheetData : [],
      },
    };
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return {
      props: {
        sheetData: [],
      },
    };
  }
}`
  );

  // Ensure proper imports are present
  if (!content.includes("import HeaderNotice")) {
    content = content.replace(
      "import RegionTabs from '../components/RegionTabs';",
      "import RegionTabs from '../components/RegionTabs';\nimport HeaderNotice from '../components/HeaderNotice';"
    );
  }

  if (!content.includes("import InternalLinks")) {
    content = content.replace(
      "import HeaderNotice from '../components/HeaderNotice';",
      "import HeaderNotice from '../components/HeaderNotice';\nimport InternalLinks from '../components/InternalLinks';"
    );
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ 오류 수정 완료: ${region.path}.js`);
});

console.log('🎉 모든 파일 오류 수정 완료');
