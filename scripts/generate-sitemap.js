const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://wdkor.co.kr'; // 도메인 입력
const pagesDir = path.join(__dirname, '..', 'pages'); // ✅ 경로 수정됨
const files = fs.readdirSync(pagesDir).filter((file) => file.endsWith('.js'));

const urls = files.map((file) => {
  const name = path.basename(file, '.js');
  return `${BASE_URL}/${name}`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemap, 'utf-8');
console.log('✅ sitemap.xml 생성 완료');
