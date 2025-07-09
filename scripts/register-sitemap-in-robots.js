const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://wdkor.co.kr';  // ✅ 너 도메인
const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
const sitemapUrl = `${BASE_URL}/sitemap.xml`;

let content = '';

if (fs.existsSync(robotsPath)) {
  content = fs.readFileSync(robotsPath, 'utf-8');
}

if (!content.includes(`Sitemap: ${sitemapUrl}`)) {
  content += `\nSitemap: ${sitemapUrl}\n`;
  fs.writeFileSync(robotsPath, content, 'utf-8');
  console.log('✅ robots.txt에 sitemap 경로 추가 완료');
} else {
  console.log('✅ robots.txt에 이미 sitemap 경로가 등록되어 있음');
}
