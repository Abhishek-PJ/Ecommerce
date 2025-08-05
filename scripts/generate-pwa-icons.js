import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, '../public/screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

console.log('PWA directories created successfully!');
console.log('Please add your app icons in the following sizes to /public/icons/:');
console.log('- icon-16x16.png');
console.log('- icon-32x32.png');
console.log('- icon-72x72.png');
console.log('- icon-96x96.png');
console.log('- icon-128x128.png');
console.log('- icon-144x144.png');
console.log('- icon-152x152.png');
console.log('- icon-167x167.png');
console.log('- icon-180x180.png');
console.log('- icon-192x192.png');
console.log('- icon-384x384.png');
console.log('- icon-512x512.png');
console.log('');
console.log('Please add screenshots to /public/screenshots/:');
console.log('- desktop.png (1280x720)');
console.log('- mobile.png (390x844)'); 