#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("📦 Creating Chrome Extension Package (.crx file)\n");

// Check if extension-dist exists
if (!fs.existsSync("extension-dist")) {
  console.log(
    "❌ extension-dist folder not found. Building extension first...\n"
  );
  try {
    execSync("npm run build:extension", { stdio: "inherit" });
    console.log("✅ Extension built successfully!\n");
  } catch (error) {
    console.error("❌ Failed to build extension:", error.message);
    process.exit(1);
  }
}

// Create .crx file using Chrome's command line
const extensionPath = path.resolve("extension-dist");
const crxPath = path.resolve("linear-formatter-extension.crx");
const keyPath = path.resolve("extension-key.pem");

console.log("🔑 Creating extension key...");
try {
  // Generate private key if it doesn't exist
  if (!fs.existsSync(keyPath)) {
    execSync(`openssl genrsa -out "${keyPath}" 2048`, { stdio: "inherit" });
    console.log("✅ Private key created");
  } else {
    console.log("✅ Using existing private key");
  }

  // Create .crx file
  console.log("📦 Creating .crx file...");

  // Try different Chrome commands for different platforms
  const chromeCommands = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "google-chrome",
    "google-chrome-stable",
    "chromium-browser",
    "chromium",
  ];

  let chromeCommand = null;
  for (const cmd of chromeCommands) {
    try {
      execSync(`which "${cmd}"`, { stdio: "ignore" });
      chromeCommand = cmd;
      break;
    } catch (e) {
      // Command not found, try next
    }
  }

  if (!chromeCommand) {
    throw new Error("Chrome browser not found. Please install Google Chrome.");
  }

  console.log(`Using Chrome command: ${chromeCommand}`);

  execSync(
    `"${chromeCommand}" --pack-extension="${extensionPath}" --pack-extension-key="${keyPath}"`,
    { stdio: "inherit" }
  );

  // Move the created .crx file to project root
  const generatedCrx = path.join(extensionPath, "extension-dist.crx");
  if (fs.existsSync(generatedCrx)) {
    fs.renameSync(generatedCrx, crxPath);
    console.log("✅ .crx file created successfully!");
  }

  console.log("\n📁 Files created:");
  console.log(`✅ ${crxPath}`);
  console.log(`✅ ${keyPath}`);
  console.log("\n🚀 Installation methods:");
  console.log("1. Drag .crx file to chrome://extensions/");
  console.log("2. Share .crx file with others");
  console.log("3. Host .crx file on your website");
} catch (error) {
  console.error("❌ Error creating .crx file:", error.message);

  // Fallback: Create a ZIP file instead
  console.log("\n🔄 Creating ZIP file as fallback...");
  try {
    const zipPath = path.resolve("linear-formatter-extension.zip");
    execSync(`cd "${extensionPath}" && zip -r "${zipPath}" .`, {
      stdio: "inherit",
    });
    console.log("✅ ZIP file created successfully!");
    console.log(`📁 File: ${zipPath}`);
    console.log("\n💡 Installation instructions for ZIP file:");
    console.log("1. Extract the ZIP file");
    console.log("2. Go to chrome://extensions/");
    console.log("3. Enable Developer mode");
    console.log("4. Click 'Load unpacked'");
    console.log("5. Select the extracted folder");
  } catch (zipError) {
    console.error("❌ Failed to create ZIP file:", zipError.message);
  }

  console.log("\n💡 Alternative: Use manual packing method");
  console.log("1. Go to chrome://extensions/");
  console.log("2. Enable Developer mode");
  console.log("3. Click 'Pack extension'");
  console.log("4. Select extension-dist folder");
  console.log("5. Select extension-key.pem (if exists)");
}
