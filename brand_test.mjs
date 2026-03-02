import sharp from "sharp";
import fs from "fs";
import path from "path";

const LOGO_PATH = "public/logo/nivaranLogo.svg";

async function createWatermark() {
  const logoWidth = 180;
  const logoHeight = 54;
  const padX = 16;
  const padY = 10;
  const totalW = logoWidth + padX * 2;
  const totalH = logoHeight + padY * 2;

  // Semi-transparent dark pill background
  const bgSvg = `<svg width="${totalW}" height="${totalH}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${totalW}" height="${totalH}" rx="8" ry="8" fill="rgba(0,0,0,0.4)"/>
  </svg>`;

  const logoPng = await sharp(LOGO_PATH)
    .resize({ width: logoWidth, height: logoHeight, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const watermark = await sharp(Buffer.from(bgSvg))
    .composite([{ input: logoPng, left: padX, top: padY, blend: "over" }])
    .png()
    .toBuffer();

  return watermark;
}

async function brandImage(inputPath, outputPath, watermark) {
  const ext = path.extname(outputPath).toLowerCase();
  let pipeline = sharp(inputPath).composite([
    { input: watermark, gravity: "southeast", blend: "over" }
  ]);

  if (ext === ".avif") pipeline = pipeline.avif({ quality: 85 });
  else if (ext === ".png") pipeline = pipeline.png({ quality: 95 });
  else if (ext === ".jpeg" || ext === ".jpg") pipeline = pipeline.jpeg({ quality: 90, mozjpeg: true });

  await pipeline.toFile(outputPath);
  const stat = fs.statSync(outputPath);
  console.log(`  Saved: ${outputPath} (${(stat.size / 1024).toFixed(0)}KB)`);
}

async function main() {
  console.log("Creating Nivaran watermark...");
  const watermark = await createWatermark();

  // TEST: Only hero_img_1 for now
  const testFile = "public/hero_img/hero_img_1.avif";
  const testOut = "public/hero_img/hero_img_1_branded.avif";

  console.log(`Branding: ${testFile}`);
  await brandImage(testFile, testOut, watermark);
  console.log("\nDone! Open the branded file to review:");
  console.log(`  ${testOut}`);
}

main();
