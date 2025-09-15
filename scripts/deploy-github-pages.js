#!/usr/bin/env node

import fs from "fs";
import { execSync } from "child_process";
import path from "path";

console.log("🚀 Deploying to GitHub Pages\n");

// Create a temporary directory for GitHub Pages
const pagesDir = "gh-pages-temp";
const pagesPath = path.resolve(pagesDir);

console.log("📁 Preparing files for GitHub Pages...");

// Create pages directory
if (fs.existsSync(pagesDir)) {
  execSync(`rm -rf "${pagesDir}"`);
}
fs.mkdirSync(pagesDir);

// Copy files to pages directory
const filesToCopy = [
  "extension-installer.html",
  "chrome-store-package.zip",
  "linear-formatter-extension.crx",
  "linear-formatter-extension.zip",
  "PRIVACY_POLICY.md",
  "CHROME_STORE_GUIDE.md",
  "README.md",
  "extension/assets/icons/icon-128.png",
  "extension/assets/icons/icon-48.png",
  "extension/assets/icons/icon-16.png"
];

filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    const destPath = path.join(pagesDir, path.basename(file));
    
    // Create subdirectories if needed
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Copy file
    fs.copyFileSync(file, destPath);
    console.log(`✅ Copied ${file}`);
  } else {
    console.log(`❌ File not found: ${file}`);
  }
});

// Create index.html (redirect to installer)
const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linear Ticket Link Formatter</title>
    <meta http-equiv="refresh" content="0; url=extension-installer.html">
    <link rel="canonical" href="extension-installer.html">
</head>
<body>
    <p>Redirecting to <a href="extension-installer.html">Linear Ticket Link Formatter Installer</a>...</p>
</body>
</html>`;

fs.writeFileSync(path.join(pagesDir, "index.html"), indexContent);
console.log("✅ Created index.html redirect");

// Create .nojekyll file to prevent Jekyll processing
fs.writeFileSync(path.join(pagesDir, ".nojekyll"), "");
console.log("✅ Created .nojekyll file");

// Create CNAME file if needed (for custom domain)
// fs.writeFileSync(path.join(pagesDir, "CNAME"), "your-domain.com");

console.log("\n📦 Files ready for GitHub Pages:");
console.log(`📁 Directory: ${pagesDir}`);
console.log("📄 Files included:");
fs.readdirSync(pagesDir).forEach(file => {
  const filePath = path.join(pagesDir, file);
  const stats = fs.statSync(filePath);
  const sizeKB = Math.round(stats.size / 1024);
  console.log(`  ✅ ${file} (${sizeKB} KB)`);
});

console.log("\n🚀 Deployment commands:");
console.log("1. git add .");
console.log("2. git commit -m 'Deploy extension installer to GitHub Pages'");
console.log("3. git subtree push --prefix gh-pages-temp origin gh-pages");
console.log("\nOr use the automated script:");
console.log("npm run deploy:pages");

console.log("\n🌐 After deployment, your installer will be available at:");
console.log("https://tung-elfie.github.io/format-linear-tickets-link/");
