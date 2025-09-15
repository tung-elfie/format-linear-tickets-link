#!/usr/bin/env node

import fs from "fs";

console.log("🚀 GitHub Release Preparation Guide\n");

console.log("📋 Steps to create GitHub release:");
console.log("1. Go to your GitHub repository");
console.log("2. Click 'Releases' → 'Create a new release'");
console.log("3. Create a new tag (e.g., v1.0.0)");
console.log("4. Add release title: 'Linear Ticket Link Formatter v1.0.0'");
console.log("5. Add description with features and installation instructions");
console.log("6. Upload the following files:\n");

const files = [
  "chrome-store-package.zip",
  "linear-formatter-extension.crx",
  "linear-formatter-extension.zip",
  "extension-installer.html",
  "PRIVACY_POLICY.md",
  "CHROME_STORE_GUIDE.md",
];

files.forEach((file) => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? "✅" : "❌"} ${file}`);
});

console.log("\n📝 Release Description Template:");
console.log(`
## 🎉 Linear Ticket Link Formatter v1.0.0

Transform your Linear ticket links into organized markdown lists with automatic categorization!

### ✨ Features
- **Auto-format** Linear ticket links with one click
- **Right-click** context menu for quick access
- **Keyboard shortcuts** (Ctrl+Shift+L, Ctrl+Shift+F)
- **Automatic categorization** by type (Bug, Improvement, Normal)
- **Privacy-focused** - no data collection
- **Auto-format** functionality with clipboard integration

### 🚀 Installation

#### Method 1: Load Unpacked (Recommended)
1. Download \`chrome-store-package.zip\`
2. Extract the zip file
3. Open Chrome → \`chrome://extensions/\`
4. Enable "Developer mode"
5. Click "Load unpacked" → Select extracted folder

#### Method 2: .crx File
1. Download \`linear-formatter-extension.crx\`
2. Drag the file to \`chrome://extensions/\`
3. Click "Add extension" when prompted

#### Method 3: ZIP File (Alternative)
1. Download \`linear-formatter-extension.zip\`
2. Extract the zip file
3. Open Chrome → \`chrome://extensions/\`
4. Enable "Developer mode"
5. Click "Load unpacked" → Select extracted folder

### 📖 Documentation
- [Installation Guide](extension-installer.html)
- [Privacy Policy](PRIVACY_POLICY.md)
- [Chrome Store Guide](CHROME_STORE_GUIDE.md)

### 🔧 Development
- Built with React + TypeScript
- Vite build system
- Manifest V3 compliant
- Source code available in this repository

---
**Made with ❤️ for Linear users**
`);

console.log("\n🎯 Pro Tips:");
console.log("• Pin the release as 'Latest'");
console.log("• Add screenshots to the release description");
console.log("• Include installation video or GIF");
console.log("• Link to the extension installer page");
console.log("• Update README.md with installation instructions\n");

console.log("📁 Files to upload to GitHub release:");
files.forEach((file) => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`✅ ${file} (${sizeKB} KB)`);
  }
});
