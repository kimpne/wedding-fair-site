const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ✅ 지역명 매핑 (여기서 추가만 하면 됨)
const regionMap = {
  '부산웨딩박람회': 'BusanWeddingFair',
  '서울웨딩박람회': 'SeoulWeddingFair',
  // 추가 지역명 넣기
};

// ✅ 모든 pages/ 하위 .js 파일 찾기
const files = glob.sync('./pages/**/*.js');

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf-8');
  let modified = false;

  Object.entries(regionMap).forEach(([korName, engName]) => {
    const exportFuncRegex = new RegExp(`export default function (?:${korName}|${engName})`, 'g');
    if (exportFuncRegex.test(content)) {
      console.log(`▶️ 수정 중: ${file}`);

      // 1️⃣ getStaticProps 제거 (여러 줄 포함)
      content = content.replace(/export async function getStaticProps[\s\S]*?\n\}/g, '');
      modified = true;

      // 2️⃣ import { useEffect, useState } 제거
      content = content.replace(/import { useEffect, useState } from 'react';/g, '');

      // 3️⃣ 기존 useState, useEffect 코드 제거
      content = content.replace(/const \[sheetData[\s\S]*?\}\);\n/g, '');

      // 4️⃣ 함수명 변경
      content = content.replace(
        /export default function [가-힣A-Za-z0-9_]+/,
        `export default function ${engName}`
      );

      // 5️⃣ fetch 코드 삽입 (맨 위에 추가)
      const fetchCode = `
import { useEffect, useState } from 'react';

export default function ${engName}() {
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    fetch('/wedding-fair-data.json')
      .then((res) => res.json())
      .then((data) => setSheetData(data))
      .catch((err) => console.error('JSON fetch error:', err));
  }, []);`;

      content = content.replace(
        new RegExp(`export default function ${engName}\\(\\) {`),
        fetchCode
      );
    }
  });

  if (modified) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`✅ 저장 완료: ${file}`);
  }
});

console.log('\n🎉 모든 파일 수정 완료');
