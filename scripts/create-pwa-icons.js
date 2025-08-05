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
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <g transform="translate(${padding}, ${padding})">
    <!-- Shopping bag icon -->
    <rect x="${innerSize * 0.2}" y="${innerSize * 0.3}" width="${innerSize * 0.6}" height="${innerSize * 0.7}" rx="${innerSize * 0.1}" fill="white" opacity="0.9"/>
    <path d="M ${innerSize * 0.25} ${innerSize * 0.3} Q ${innerSize * 0.25} ${innerSize * 0.1} ${innerSize * 0.4} ${innerSize * 0.1} Q ${innerSize * 0.55} ${innerSize * 0.1} ${innerSize * 0.55} ${innerSize * 0.3}" stroke="white" stroke-width="${innerSize * 0.02}" fill="none"/>
    <path d="M ${innerSize * 0.35} ${innerSize * 0.1} Q ${innerSize * 0.35} ${innerSize * 0.05} ${innerSize * 0.4} ${innerSize * 0.05} Q ${innerSize * 0.45} ${innerSize * 0.05} ${innerSize * 0.45} ${innerSize * 0.1}" stroke="white" stroke-width="${innerSize * 0.02}" fill="none"/>
    <!-- Dollar sign -->
    <text x="${innerSize * 0.5}" y="${innerSize * 0.65}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${innerSize * 0.25}" font-weight="bold">₹</text>
  </g>
</svg>`;
};

// Convert SVG to PNG using Canvas (simplified approach)
const createPNGFromSVG = (svgContent, size) => {
  // For now, we'll create a simple colored square as a placeholder
  // In a real implementation, you'd use a library like sharp or canvas
  const canvas = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad${size})"/>
      <text x="${size * 0.5}" y="${size * 0.6}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${size * 0.3}" font-weight="bold">₹</text>
    </svg>
  `;
  
  return canvas;
};

// Icon sizes required for PWA
const iconSizes = [16, 32, 72, 96, 128, 144, 152, 167, 180, 192, 384, 512];

// Create icons directory
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create screenshots directory
const screenshotsDir = path.join(__dirname, '../public/screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

console.log('Creating PWA icons...');

// Generate icons
iconSizes.forEach(size => {
  const svgContent = createPNGFromSVG(createSVGIcon(size), size);
  const iconPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(iconPath, svgContent);
  console.log(`Created icon-${size}x${size}.svg`);
});

// Create placeholder screenshots
const createScreenshot = (width, height, filename) => {
  const svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="screenshotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#screenshotGrad)"/>
    <text x="${width * 0.5}" y="${height * 0.5}" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.05}" font-weight="bold">E-Commerce App Screenshot</text>
    <text x="${width * 0.5}" y="${height * 0.6}" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.03}">${width}x${height}</text>
  </svg>`;
  
  const screenshotPath = path.join(screenshotsDir, filename);
  fs.writeFileSync(screenshotPath, svgContent);
  console.log(`Created ${filename}`);
};

// Create placeholder screenshots
createScreenshot(1280, 720, 'desktop.svg');
createScreenshot(390, 844, 'mobile.svg');

console.log('\nPWA icons and screenshots created successfully!');
console.log('Note: These are SVG placeholders. For production, convert them to PNG format.');
console.log('You can use online tools or image editing software to convert SVG to PNG.'); 