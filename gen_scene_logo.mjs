import sharp from "sharp";
import fs from "fs";

const API_KEY = "AIzaSyBLzQs0_7clCgaggSVPglUmQ4NrmWM3c54";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${API_KEY}`;

// Read original SVG and create versions for different backgrounds
const logoSvgRaw = fs.readFileSync("public/logo/nivaranLogo.svg", "utf-8");

// Create dark navy version of the logo for light surfaces
const logoDark = logoSvgRaw.replace(/fill="white"/g, 'fill="#1a2544"');

async function createBannerSign(width, height) {
  // A realistic-looking organizational banner: white background, dark logo, orange accent line
  const logoW = Math.round(width * 0.6);
  const logoH = Math.round(logoW * (24 / 80));
  const logoX = Math.round((width - logoW) / 2);
  const logoY = Math.round((height - logoH) / 2) - 4;
  const lineY = logoY + logoH + 8;

  const logoPng = await sharp(Buffer.from(logoDark))
    .resize({ width: logoW, height: logoH, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // White banner with subtle border and orange accent
  const bannerSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${width}" height="${height}" rx="4" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <rect x="${logoX}" y="${lineY}" width="${logoW}" height="3" rx="1.5" fill="#eb5834"/>
    <text x="${width / 2}" y="${lineY + 18}" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#666" letter-spacing="2">FOUNDATION</text>
  </svg>`;

  const banner = await sharp(Buffer.from(bannerSvg))
    .composite([{ input: logoPng, left: logoX, top: logoY, blend: "over" }])
    .png()
    .toBuffer();

  return banner;
}

async function createTshirtLogo() {
  // White logo for dark t-shirts/vests — just the logo at the right size
  const logoW = 120;
  const logoH = Math.round(logoW * (24 / 80));
  
  const logoPng = await sharp(Buffer.from(logoSvgRaw))
    .resize({ width: logoW, height: logoH, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  return logoPng;
}

async function generateScene(prompt, aspect) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: { sampleCount: 2, aspectRatio: aspect }
    })
  });
  const json = await response.json();
  if (!json.predictions || json.predictions.length === 0) {
    throw new Error(json.error?.message || "No predictions");
  }
  // Pick largest (most detailed)
  let best = null, bestSize = 0;
  for (const p of json.predictions) {
    const buf = Buffer.from(p.bytesBase64Encoded, "base64");
    if (buf.length > bestSize) { bestSize = buf.length; best = buf; }
  }
  return best;
}

async function main() {
  console.log("=== Generating scene + compositing REAL Nivaran logo ===\n");

  // --- HERO IMAGE 1: Clinic scene with banner on wall ---
  console.log("1/1  Generating clinic scene...");
  const scene = await generateScene(
    `Photograph taken for National Geographic Nepal edition. A Nepali female doctor wearing a white coat with a stethoscope, gently examining a young Nepali boy aged 6 in a small rural health clinic in the Nepal hills. The boy sits on his mother's lap, she wears a red cotton sari with gold border. The clinic has light blue concrete walls. There is a clearly visible large blank white rectangular sign board mounted on the wall behind them, about 60cm wide. Medical posters nearby. Dust particles in the sunbeam from a wooden window. Shot on Nikon D850, 35mm f/1.4, shallow depth of field, ISO 400. Candid, unposed, authentic Nepali facial features, natural skin with pores, no AI smoothing. Film grain texture. No text anywhere in the image. No watermarks.`,
    "16:9"
  );

  // Resize scene to 1920x1080
  const sceneResized = await sharp(scene)
    .resize({ width: 1920, height: 1080, fit: "cover" })
    .png()
    .toBuffer();

  // Create a banner sign with the real logo
  const banner = await createBannerSign(220, 80);

  // Add slight gaussian blur to banner to match depth-of-field of background
  const bannerBlurred = await sharp(banner)
    .blur(0.8)  // very subtle blur to match scene's focus
    .png()
    .toBuffer();

  // Place banner on upper-right area of the wall (visible but not dominant)
  // Position: about 65% from left, 12% from top
  const bannerX = Math.round(1920 * 0.62);
  const bannerY = Math.round(1080 * 0.10);

  await sharp(sceneResized)
    .composite([{
      input: bannerBlurred,
      left: bannerX,
      top: bannerY,
      blend: "over"
    }])
    .avif({ quality: 85, effort: 4 })
    .toFile("public/hero_img/hero_img_1_scene.avif");

  const stat = fs.statSync("public/hero_img/hero_img_1_scene.avif");
  console.log(`  Saved: hero_img_1_scene.avif (${(stat.size / 1024).toFixed(0)}KB)`);
  console.log("\nDone! Opening for review...");
}

main().catch(e => console.error("Error:", e.message));
