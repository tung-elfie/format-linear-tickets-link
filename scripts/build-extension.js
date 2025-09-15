#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Ensure extension-dist directory exists
const extensionDistDir = path.join(projectRoot, "extension-dist");
if (!fs.existsSync(extensionDistDir)) {
  fs.mkdirSync(extensionDistDir, { recursive: true });
}

// Copy manifest.json
fs.copyFileSync(
  path.join(projectRoot, "extension", "manifest.json"),
  path.join(extensionDistDir, "manifest.json")
);

// Copy assets directory
const assetsSrcDir = path.join(projectRoot, "extension", "assets");
const assetsDestDir = path.join(extensionDistDir, "assets");

if (fs.existsSync(assetsSrcDir)) {
  fs.cpSync(assetsSrcDir, assetsDestDir, { recursive: true });
}

// Copy popup directory
const popupSrcDir = path.join(extensionDistDir, "extension", "popup");
const popupDestDir = path.join(extensionDistDir, "popup");

if (fs.existsSync(popupSrcDir)) {
  fs.cpSync(popupSrcDir, popupDestDir, { recursive: true });
  fs.rmSync(path.join(extensionDistDir, "extension"), { recursive: true });
}

console.log("✅ Extension build completed successfully!");
console.log(`📁 Extension files are in: ${extensionDistDir}`);
console.log("🚀 You can now load the extension in Chrome/Edge by:");
console.log("   1. Open chrome://extensions/");
console.log('   2. Enable "Developer mode"');
console.log('   3. Click "Load unpacked"');
console.log(`   4. Select the folder: ${extensionDistDir}`);
