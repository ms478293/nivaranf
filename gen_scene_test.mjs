import sharp from "sharp";
import fs from "fs";

const API_KEY = "AIzaSyBLzQs0_7clCgaggSVPglUmQ4NrmWM3c54";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${API_KEY}`;

const prompt = `Photograph taken for National Geographic Nepal edition. A Nepali female doctor wearing a white coat with a stethoscope, crouching down to examine a young Nepali boy aged 6 in a small rural health clinic in the hills of Nepal. The boy sits on his mother's lap, she wears a red cotton sari. Behind them on the light blue concrete wall there is a large professionally printed banner that clearly reads "NIVARAN FOUNDATION" in bold dark letters with an orange accent line underneath. The banner looks like it was hung by the organization that runs this clinic. Dust particles visible in sunbeam from the wooden window. Medical supplies on a shelf. Shot on Nikon D850, 35mm f/1.4, shallow depth of field, ISO 400. Candid unposed moment, authentic Nepali South Asian facial features, natural skin with visible pores, no AI smoothing. Film grain texture. No watermarks.`;

async function main() {
  console.log("Generating hero_img_1 with NIVARAN branding in scene...");
  
  // Generate 3 candidates and pick best
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: { sampleCount: 3, aspectRatio: "16:9" }
    })
  });

  const json = await response.json();
  if (!json.predictions || json.predictions.length === 0) {
    console.error("FAILED:", json.error?.message || JSON.stringify(json));
    return;
  }

  console.log(`Got ${json.predictions.length} candidates`);

  // Save all candidates so user can pick the best
  for (let i = 0; i < json.predictions.length; i++) {
    const buf = Buffer.from(json.predictions[i].bytesBase64Encoded, "base64");
    const outPath = `public/hero_img/hero_img_1_v${i + 1}.avif`;
    await sharp(buf)
      .resize({ width: 1920, height: 1080, fit: "cover" })
      .avif({ quality: 85, effort: 4 })
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`  Saved candidate ${i + 1}: ${outPath} (${(stat.size / 1024).toFixed(0)}KB)`);
  }

  console.log("\nDone! Opening all 3 candidates for you to pick the best one...");
}

main();
