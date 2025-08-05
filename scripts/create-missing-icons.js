import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple SVG icon for the e-commerce app
const createSVGIcon = (size) => {
  const padding = size * 0.1;
  const innerSize = size - (padding * 2);
  
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad${size})"/>
  <text x="${size * 0.5}" y="${size * 0.6}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${size * 0.3}" font-weight="bold">₹</text>
</svg>`;
};

// Create icons directory
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('Creating missing PWA icons...');

// Generate missing icons
const missingSizes = [16, 32];
missingSizes.forEach(size => {
  const svgContent = createSVGIcon(size);
  const iconPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(iconPath, svgContent);
  console.log(`Created icon-${size}x${size}.svg`);
});

console.log('Missing PWA icons created successfully!'); 