import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const BLOG_DIR = path.join(process.cwd(), "public", "assets", "blog");

function hashString(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function seededUnit(seed, slot) {
  const value = Math.sin(seed * 12.9898 + slot * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function buildVignetteSvg(width, height, strength) {
  const innerStop = 52 + seededUnit(strength, 9) * 14;

  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stop-color="black" stop-opacity="0"/>
          <stop offset="${innerStop}%" stop-color="black" stop-opacity="0"/>
          <stop offset="100%" stop-color="black" stop-opacity="${strength.toFixed(3)}"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#vignette)"/>
    </svg>`,
  );
}

async function buildGrainOverlay(width, height, amount) {
  return sharp({
    create: {
      width,
      height,
      channels: 3,
      noise: {
        type: "gaussian",
        mean: 128,
        sigma: 14 + amount * 16,
      },
    },
  })
    .greyscale()
    .png()
    .toBuffer();
}

async function processBlogImage(fileName) {
  const seed = hashString(fileName.replace(/\.jpg$/, ""));
  const inputPath = path.join(BLOG_DIR, fileName);
  const brightness = 0.98 + seededUnit(seed, 1) * 0.05;
  const saturation = 0.94 + seededUnit(seed, 2) * 0.1;
  const hue = Math.round((seededUnit(seed, 3) - 0.5) * 4);
  const grainAmount = 0.35 + seededUnit(seed, 4) * 0.45;
  const vignetteStrength = 0.1 + seededUnit(seed, 5) * 0.12;
  const blurSigma = 0.3 + seededUnit(seed, 6) * 0.25;
  const sharpenSigma = 0.4 + seededUnit(seed, 7) * 0.35;
  const jpegQuality = Math.round(78 + seededUnit(seed, 8) * 8);
  const warmShift = seededUnit(seed, 10) > 0.5;

  const source = sharp(inputPath).rotate();
  const { width, height } = await source.metadata();

  if (!width || !height) {
    throw new Error(`Could not read dimensions for ${fileName}`);
  }

  const graded = await source
    .modulate({ brightness, saturation, hue })
    .blur(blurSigma)
    .sharpen({ sigma: sharpenSigma, m1: 0.45, m2: 0.18, x1: 2, y2: 8, y3: 16 })
    .toBuffer();

  const grain = await buildGrainOverlay(width, height, grainAmount);
  const vignette = buildVignetteSvg(width, height, vignetteStrength);

  const warmMatrix = [
    [1.02, 0.01, 0],
    [0.01, 1, 0],
    [0, 0, 0.98],
  ];
  const coolMatrix = [
    [0.98, 0, 0.01],
    [0, 1, 0.01],
    [0.01, 0, 1.02],
  ];

  const output = await sharp(graded)
    .recomb(warmShift ? warmMatrix : coolMatrix)
    .composite([
      { input: grain, blend: "soft-light" },
      { input: vignette, blend: "multiply" },
    ])
    .jpeg({
      quality: jpegQuality,
      mozjpeg: true,
      chromaSubsampling: "4:2:0",
    })
    .toBuffer();

  await writeFile(inputPath, output);

  return {
    fileName,
    brightness: brightness.toFixed(3),
    saturation: saturation.toFixed(3),
    grainAmount: grainAmount.toFixed(2),
    vignetteStrength: vignetteStrength.toFixed(2),
    jpegQuality,
    warmTint: warmShift,
    sizeKb: Math.round(output.length / 1024),
  };
}

const files = (await readdir(BLOG_DIR)).filter((file) => file.endsWith(".jpg")).sort();
const results = [];

for (const fileName of files) {
  results.push(await processBlogImage(fileName));
}

console.log("Processed blog images with natural imperfections:");
for (const result of results) {
  console.log(
    `- ${result.fileName}: ${result.sizeKb}KB, grain ${result.grainAmount}, vignette ${result.vignetteStrength}, q${result.jpegQuality}, ${result.warmTint ? "warm" : "cool"}`,
  );
}
