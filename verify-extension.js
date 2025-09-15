#!/usr/bin/env node

import fs from "fs";
import path from "path";

const extensionDir = "./extension-dist";

console.log("🔍 Verifying Extension Structure...\n");

// Check if extension directory exists
if (!fs.existsSync(extensionDir)) {
  console.error("❌ Extension directory does not exist!");
  process.exit(1);
}

// Check manifest.json
const manifestPath = path.join(extensionDir, "manifest.json");
if (!fs.existsSync(manifestPath)) {
  console.error("❌ manifest.json is missing!");
  process.exit(1);
}

// Validate manifest.json
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  console.log("✅ manifest.json exists and is valid");
  console.log(`   Name: ${manifest.name}`);
  console.log(`   Version: ${manifest.version}`);
  console.log(`   Manifest Version: ${manifest.manifest_version}`);
} catch (error) {
  console.error("❌ manifest.json is invalid JSON:", error.message);
  process.exit(1);
}

// Check required files
const requiredFiles = [
  "popup/popup.html",
  "background/service-worker.js",
  "content/content-script.js",
];

let allFilesExist = true;
requiredFiles.forEach((file) => {
  const filePath = path.join(extensionDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.error(`❌ ${file} is missing!`);
    allFilesExist = false;
  }
});

// Check assets
const assetsDir = path.join(extensionDir, "assets");
if (fs.existsSync(assetsDir)) {
  const assets = fs.readdirSync(assetsDir);
  const jsFiles = assets.filter((file) => file.endsWith(".js"));
  if (jsFiles.length > 0) {
    console.log(`✅ Assets directory exists with ${jsFiles.length} JS file(s)`);
  } else {
    console.error("❌ No JS files found in assets directory");
    allFilesExist = false;
  }
} else {
  console.error("❌ Assets directory is missing!");
  allFilesExist = false;
}

// Check icons
const iconsDir = path.join(extensionDir, "assets", "icons");
if (fs.existsSync(iconsDir)) {
  const icons = fs.readdirSync(iconsDir);
  const svgIcons = icons.filter((file) => file.endsWith(".svg"));
  console.log(`✅ Icons directory exists with ${svgIcons.length} SVG file(s)`);
} else {
  console.error("❌ Icons directory is missing!");
  allFilesExist = false;
}

console.log("\n📁 Extension Structure:");
console.log(
  fs
    .readdirSync(extensionDir)
    .map((item) => `   ${item}`)
    .join("\n")
);

if (allFilesExist) {
  console.log("\n🎉 Extension structure is valid and ready for installation!");
  console.log("\n📋 Installation Instructions:");
  console.log("1. Open chrome://extensions/");
  console.log('2. Enable "Developer mode"');
  console.log('3. Click "Load unpacked"');
  console.log(`4. Select this folder: ${path.resolve(extensionDir)}`);
} else {
  console.log(
    "\n❌ Extension structure has issues. Please rebuild the extension."
  );
  process.exit(1);
}
