const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_IMAGES = path.join(process.cwd(), 'public', 'images');

async function convertImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await convertImages(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const outputPath = fullPath.replace(ext, '.webp');
    // Skip if webp already exists and is newer
    if (fs.existsSync(outputPath)) {
      const origStat = fs.statSync(fullPath);
      const webpStat = fs.statSync(outputPath);
      if (webpStat.mtime >= origStat.mtime) {
        console.log(`Skipping (up-to-date): ${path.relative(PUBLIC_IMAGES, outputPath)}`);
        continue;
      }
    }

    try {
      await sharp(fullPath)
        .webp({ quality: 80, effort: 4 })
        .toFile(outputPath);
      const origSize = fs.statSync(fullPath).size;
      const newSize = fs.statSync(outputPath).size;
      const saved = ((1 - newSize / origSize) * 100).toFixed(1);
      console.log(
        `Converted: ${path.relative(PUBLIC_IMAGES, fullPath)} -> ${path.relative(PUBLIC_IMAGES, outputPath)} (${saved}% smaller)`
      );
    } catch (err) {
      console.error(`Error converting ${fullPath}:`, err.message);
    }
  }
}

convertImages(PUBLIC_IMAGES).then(() => {
  console.log('Done converting images to WebP');
}).catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
