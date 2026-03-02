#!/usr/bin/env node
/**
 * Generate IMAGE 1 — Hero Image 1: Children in a Nepali mountain village
 * Uses Imagen 4 Ultra for best photorealism
 */
import { writeFileSync, mkdirSync } from "fs";
import { execSync } from "child_process";

const API_KEY = "AIzaSyBLzQs0_7clCgaggSVPglUmQ4NrmWM3c54";
const MODEL = "imagen-4.0-ultra-generate-001";

const PROMPT = `Ultra-realistic photograph of five Nepali children aged 6–14, standing together outdoors in a traditional stone-and-mud Himalayan village. The children wear warm, layered casual clothing — sweaters, jackets in earthy tones. The village background shows rustic stone houses, terraced hillsides, and snow-capped Himalayan peaks under a clear golden-hour sky. All faces show genuine happiness and curiosity. The youngest child in front wears a small t-shirt with the Nivaran logo — an orange rising human figure and teal "NIVARAN" text — printed on the chest. Sharp focus on all subjects and background. No blur anywhere. Natural warm afternoon sunlight. Wide-angle shot, photojournalistic style, 8K resolution.`;

const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`;

const body = {
  instances: [{ prompt: PROMPT }],
  parameters: {
    sampleCount: 1,
    aspectRatio: "16:9",
    personGeneration: "allow_all",
    outputOptions: { mimeType: "image/jpeg", compressionQuality: 95 },
  },
};

console.log("🎨 Generating Hero Image 1 with Imagen 4 Ultra...");
console.log("   This may take 30-60 seconds...\n");

const resp = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

if (!resp.ok) {
  const errText = await resp.text();
  console.error(`❌ API Error ${resp.status}: ${errText}`);
  process.exit(1);
}

const data = await resp.json();

if (!data.predictions || data.predictions.length === 0) {
  console.error("❌ No predictions returned");
  console.error(JSON.stringify(data, null, 2));
  process.exit(1);
}

const img = data.predictions[0];
const buf = Buffer.from(img.bytesBase64Encoded, "base64");

// Save the raw JPEG first
const rawPath = "public/hero_img/hero_img_1_raw.jpg";
writeFileSync(rawPath, buf);
console.log(`✅ Raw JPEG saved: ${rawPath} (${(buf.length / 1024).toFixed(0)} KB)`);

// Convert to WebP using sharp (if available) or sips (macOS built-in)
try {
  // Try sharp first
  const sharp = (await import("sharp")).default;
  
  const webpBuf = await sharp(buf)
    .webp({ quality: 85, effort: 6 })
    .toBuffer();
  writeFileSync("public/hero_img/hero_img_1.webp", webpBuf);
  console.log(`✅ WebP saved: public/hero_img/hero_img_1.webp (${(webpBuf.length / 1024).toFixed(0)} KB)`);

  const avifBuf = await sharp(buf)
    .avif({ quality: 72, effort: 6 })
    .toBuffer();
  writeFileSync("public/hero_img/hero_img_1.avif", avifBuf);
  console.log(`✅ AVIF saved: public/hero_img/hero_img_1.avif (${(avifBuf.length / 1024).toFixed(0)} KB)`);

  console.log("\n🎉 Hero Image 1 generated and saved in all formats!");
} catch (e) {
  console.log("⚠️  sharp not available, using sips for conversion...");
  execSync(`sips -s format png "${rawPath}" --out "public/hero_img/hero_img_1_tmp.png"`);
  execSync(`sips -s format jpeg "${rawPath}" --out "public/hero_img/hero_img_1.webp"`);
  console.log("⚠️  Saved as JPEG with .webp extension (install sharp for true WebP)");
  console.log("\n🎉 Hero Image 1 generated! Use sharp for proper WebP/AVIF conversion.");
}
