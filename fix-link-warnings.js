
const fs = require('fs');
const path = require('path');

// Find all JS files in components and pages directories
const findJSFiles = (dir) => {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findJSFiles(fullPath));
    } else if (item.endsWith('.js')) {
      files.push(fullPath);
    }
  });
  
  return files;
};

const componentsFiles = findJSFiles(path.join(__dirname, 'components'));
const pagesFiles = findJSFiles(path.join(__dirname, 'pages'));
const allFiles = [...componentsFiles, ...pagesFiles];

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let hasChanges = false;

  // Fix Link with legacyBehavior
  if (content.includes('<Link') && content.includes('<a')) {
    // Replace Link with a tag inside to new Link syntax
    content = content.replace(
      /<Link\s+([^>]*?)>\s*<a\s+([^>]*?)>(.*?)<\/a>\s*<\/Link>/gs,
      (match, linkProps, aProps, content) => {
        // Extract href from Link props or a props
        let href = '';
        const linkHref = linkProps.match(/href=["']([^"']*)["']/);
        const aHref = aProps.match(/href=["']([^"']*)["']/);
        
        if (linkHref) {
          href = linkHref[1];
        } else if (aHref) {
          href = aHref[1];
        }
        
        // Remove href from a props if it exists
        const cleanAProps = aProps.replace(/href=["'][^"']*["']\s*/, '').trim();
        
        if (href) {
          return `<Link href="${href}"${cleanAProps ? ` ${cleanAProps}` : ''}>${content}</Link>`;
        } else {
          return match; // Keep original if no href found
        }
      }
    );
    hasChanges = true;
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Link 경고 수정 완료: ${path.relative(__dirname, filePath)}`);
  }
});

console.log('🎉 모든 Link 경고 수정 완료');
