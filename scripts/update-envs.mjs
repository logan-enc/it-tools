import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../src/layouts/base.layout.vue');

try {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove the buymeacoffee button and its tooltip wrapper
  content = content.replace(
    /<c-tooltip position="bottom" :tooltip="\$t\('home\.support'\)">[\s\S]*?<\/c-tooltip>/,
    ''
  );
  
  // Remove Heart from imports if it's no longer used
  content = content.replace(
    /,\s*Heart\s*(?=,\s*Home2)/,
    ''
  );
  // Also handle if Heart is the last import
  content = content.replace(
    /Heart,\s*/,
    ''
  );
  
  // Remove the .support-button CSS class definition
  content = content.replace(
    /\.support-button\s*\{[\s\S]*?\n\}/,
    ''
  );
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('✓ Successfully removed buymeacoffee button from base.layout.vue');

  // Remove X.com button from NavbarButtons.vue
  const navbarButtonsPath = path.join(__dirname, '../src/components/NavbarButtons.vue');
  
  let navbarContent = fs.readFileSync(navbarButtonsPath, 'utf-8');
  
  // Remove the X.com button and its tooltip wrapper
  navbarContent = navbarContent.replace(
    /<c-tooltip :tooltip="\$t\('home\.nav\.twitterX'\)" position="bottom">[\s\S]*?<\/c-tooltip>\s*/,
    ''
  );
  
  // Remove IconBrandX from imports
  navbarContent = navbarContent.replace(
    /,\s*IconBrandX\s*(?=,)/,
    ''
  );
  // Also handle if IconBrandX is at the end
  navbarContent = navbarContent.replace(
    /,\s*IconBrandX(?=\s*\})/,
    ''
  );
  // Handle if IconBrandX is the only icon
  navbarContent = navbarContent.replace(
    /IconBrandX,\s*/,
    ''
  );
  
  fs.writeFileSync(navbarButtonsPath, navbarContent, 'utf-8');
  console.log('✓ Successfully removed X.com button from NavbarButtons.vue');
} catch (error) {
  console.error('✗ Error updating files:', error.message);
  process.exit(1);
}
