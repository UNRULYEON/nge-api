#!/usr/bin/env bun
/**
 * Image Conversion Script
 *
 * Converts all images in src/db/schema/assets/ to PNG format.
 * Backs up original images to assets-backup/<timestamp>/ in the project root,
 * preserving the original folder structure.
 *
 * Usage: bun run scripts/convert-images.ts
 */

import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, extname, join, relative } from "node:path";
import { $ } from "bun";

const ASSETS_PATH = "src/db/schema/assets";
const BACKUP_BASE = "assets-backup";
const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".bmp",
  ".tiff",
];

interface ImageFile {
  sourcePath: string;
  relativePath: string;
}

function getTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

function findImages(dir: string, images: ImageFile[] = []): ImageFile[] {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      findImages(fullPath, images);
    } else {
      const ext = extname(entry).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        images.push({
          sourcePath: fullPath,
          relativePath: relative(ASSETS_PATH, fullPath),
        });
      }
    }
  }

  return images;
}

async function backupImage(
  image: ImageFile,
  backupPath: string,
): Promise<void> {
  const destPath = join(backupPath, image.relativePath);
  const destDir = dirname(destPath);

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  await Bun.write(destPath, Bun.file(image.sourcePath));
  console.log(`  Backed up: ${image.relativePath}`);
}

async function convertToPng(image: ImageFile): Promise<void> {
  const ext = extname(image.sourcePath).toLowerCase();

  // Skip if already PNG
  if (ext === ".png") {
    console.log(`  Already PNG: ${image.relativePath}`);
    return;
  }

  const dir = dirname(image.sourcePath);
  const nameWithoutExt = basename(image.sourcePath, extname(image.sourcePath));
  const pngPath = join(dir, `${nameWithoutExt}.png`);

  try {
    // Use sips (macOS built-in) for conversion
    await $`sips -s format png ${image.sourcePath} --out ${pngPath}`.quiet();

    // Remove the original file
    await $`rm ${image.sourcePath}`.quiet();

    console.log(`  Converted: ${image.relativePath} -> ${nameWithoutExt}.png`);
  } catch (error) {
    console.error(`  Failed to convert ${image.relativePath}:`, error);
  }
}

async function main() {
  console.log("Image Conversion Script");
  console.log("=======================\n");

  if (!existsSync(ASSETS_PATH)) {
    console.error(`Assets path not found: ${ASSETS_PATH}`);
    process.exit(1);
  }

  // Find all images
  const images = findImages(ASSETS_PATH);

  if (images.length === 0) {
    console.log("No images found.");
    return;
  }

  console.log(`Found ${images.length} image(s)\n`);

  // Create timestamped backup folder
  const timestamp = getTimestamp();
  const backupPath = join(BACKUP_BASE, timestamp);
  console.log(`Backup folder: ${backupPath}\n`);

  // Backup originals
  console.log("Backing up original images...");
  for (const image of images) {
    await backupImage(image, backupPath);
  }
  console.log();

  // Convert to PNG
  console.log("Converting images to PNG...");
  for (const image of images) {
    await convertToPng(image);
  }
  console.log();

  console.log("Done!");
}

main().catch(console.error);
