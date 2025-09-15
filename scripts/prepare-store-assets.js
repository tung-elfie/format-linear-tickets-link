#!/usr/bin/env node

import fs from "fs";

console.log("🎨 Chrome Web Store Asset Preparation Guide\n");

console.log("📸 Required Screenshots:");
console.log("1. Main popup interface (1280x800px recommended)");
console.log("2. Context menu in action (1280x800px recommended)");
console.log("3. Before/after comparison (1280x800px recommended)");
console.log("4. Settings or options (if any) (1280x800px recommended)\n");

console.log("🖼️ Promotional Images (Optional but recommended):");
console.log("• Small tile: 128x128px");
console.log("• Large tile: 440x280px");
console.log("• Marquee: 1400x560px\n");

console.log("📋 Store Listing Checklist:");
console.log("✅ Extension package: chrome-store-package.zip");
console.log("✅ Icons: 16x16, 48x48, 128x128 PNG files");
console.log("✅ Privacy policy: PRIVACY_POLICY.md");
console.log("✅ Description and screenshots ready");
console.log("✅ Developer account with $5 registration fee paid\n");

console.log("🚀 Next Steps:");
console.log("1. Take screenshots of your extension in action");
console.log("2. Create promotional images (optional)");
console.log("3. Update PRIVACY_POLICY.md with your contact info");
console.log("4. Go to Chrome Web Store Developer Dashboard");
console.log("5. Upload chrome-store-package.zip");
console.log("6. Fill out all required store listing information");
console.log("7. Submit for review\n");

console.log("📁 Files ready for upload:");
const files = [
  "chrome-store-package.zip",
  "extension/assets/icons/icon-16.png",
  "extension/assets/icons/icon-48.png",
  "extension/assets/icons/icon-128.png",
  "PRIVACY_POLICY.md",
];

files.forEach((file) => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? "✅" : "❌"} ${file}`);
});

console.log("\n🎯 Pro Tips:");
console.log("• Test your extension on multiple websites");
console.log("• Take screenshots on different sites to show versatility");
console.log("• Write a compelling description highlighting key benefits");
console.log("• Be transparent about permissions in your privacy policy");
console.log("• Respond to user reviews after publication\n");

console.log("📖 Full guide available in: CHROME_STORE_GUIDE.md");
