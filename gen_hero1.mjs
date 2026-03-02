import sharp from "sharp";
import fs from "fs";

const API_KEY = "AIzaSyBLzQs0_7clCgaggSVPglUmQ4NrmWM3c54";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${API_KEY}`;

// ── Read logo SVG ──
const logoSvgWhite = fs.readFileSync("public/logo/nivaranLogo.svg", "utf-8");
const logoSvgDark = logoSvgWhite.replace(/fill="white"/g, 'fill="#1a2544"');

// ── Generate image via Imagen 4 Ultra ──
async function generate(prompt, aspect = "16:9") {
  console.log("  Calling Imagen 4 Ultra...");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: { sampleCount: 2, aspectRatio: aspect },
    }),
  });
  const json = await res.json();
  if (!json.predictions?.length) throw new Error(json.error?.message || "No predictions returned");
  // Pick the largest/best quality
  let best = null, bestSize = 0;
  for (const p of json.predictions) {
    const buf = Buffer.from(p.bytesBase64Encoded, "base64");
    if (buf.length > bestSize) { bestSize = buf.length; best = buf; }
  }
  console.log(`  Got image (${(bestSize / 1024).toFixed(0)}KB raw)`);
  return best;
}

// ── Create a realistic clinic signboard with the REAL Nivaran logo ──
async function createSignboard(w, h) {
  const logoW = Math.round(w * 0.55);
  const logoH = Math.round(logoW * (24 / 80));
  const logoX = Math.round((w - logoW) / 2);
  const logoY = Math.round((h - logoH) / 2) - 6;
  const lineY = logoY + logoH + 6;

  // Render the dark logo to PNG
  const logoPng = await sharp(Buffer.from(logoSvgDark))
    .resize({ width: logoW, height: logoH, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // White signboard with subtle shadow, orange accent line, "FOUNDATION" text
  const boardSvg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#00000030"/>
      </filter>
    </defs>
    <rect x="2" y="2" width="${w - 4}" height="${h - 4}" rx="6" fill="white" filter="url(#shadow)" stroke="#d4d4d4" stroke-width="0.5"/>
    <rect x="${logoX}" y="${lineY}" width="${logoW}" height="2.5" rx="1.25" fill="#eb5834"/>
    <text x="${w / 2}" y="${lineY + 15}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9" fill="#888" letter-spacing="3" font-weight="400">FOUNDATION</text>
  </svg>`;

  return sharp(Buffer.from(boardSvg))
    .composite([{ input: logoPng, left: logoX, top: logoY, blend: "over" }])
    .png()
    .toBuffer();
}

async function main() {
  console.log("=== HERO IMAGE 1 — Clinic scene with real Nivaran logo ===\n");

  // Step 1: Generate the base scene
  console.log("[1/3] Generating base scene...");
  const scene = await generate(
    `Award-winning documentary photograph for National Geographic Nepal. Inside a small rural health clinic in the hills of Nepal. A kind Nepali female doctor in her 30s wearing a clean white lab coat with stethoscope around her neck, gently examining the ear of a young Nepali boy aged 5-6, who sits calmly on his mother's lap. The mother wears a traditional red cotton sari with thin gold border, looking at her son with tender concern. The clinic has pale blue painted concrete walls. On the wall behind them is a clearly visible, large blank white rectangular signboard, approximately 60cm wide and 20cm tall, mounted at eye level — the signboard is completely blank and pure white with no text or logos. A beam of warm sunlight streams through a small wooden-framed window, casting golden light across the scene with visible floating dust particles. A glass jar of cotton swabs, a blood pressure monitor, and a faded Nepal government health poster are on the desk nearby. Shot on Nikon D850, Nikkor 35mm f/1.4G, ISO 400, 1/125s, shallow depth of field. Visible skin pores, natural imperfections, film grain texture. Candid, emotional, unposed documentary style. No text, no watermarks, no logos anywhere in the image.`,
    "16:9"
  );

  // Step 2: Resize to final dimensions
  console.log("[2/3] Processing & compositing logo...");
  const W = 1920, H = 1080;
  const sceneResized = await sharp(scene).resize({ width: W, height: H, fit: "cover" }).png().toBuffer();

  // Create the signboard with real logo
  const signW = 240, signH = 88;
  const signboard = await createSignboard(signW, signH);

  // Slight blur to match background depth-of-field
  const signBlurred = await sharp(signboard).blur(0.7).png().toBuffer();

  // Position: upper-right area of the wall (62% from left, 10% from top)
  const signX = Math.round(W * 0.62);
  const signY = Math.round(H * 0.08);

  // Composite signboard onto scene
  const final = await sharp(sceneResized)
    .composite([{ input: signBlurred, left: signX, top: signY, blend: "over" }])
    .toBuffer();

  // Step 3: Save in both AVIF and WebP
  console.log("[3/3] Saving AVIF + WebP...");

  await sharp(final).avif({ quality: 82, effort: 6 }).toFile("public/hero_img/hero_img_1_new.avif");
  await sharp(final).webp({ quality: 82 }).toFile("public/hero_img/hero_img_1_new.webp");

  const avifStat = fs.statSync("public/hero_img/hero_img_1_new.avif");
  const webpStat = fs.statSync("public/hero_img/hero_img_1_new.webp");
  console.log(`\n  hero_img_1_new.avif  → ${(avifStat.size / 1024).toFixed(0)}KB`);
  console.log(`  hero_img_1_new.webp  → ${(webpStat.size / 1024).toFixed(0)}KB`);
  console.log("\nDone! Review these before replacing the originals.");
}

main().catch(console.error);
