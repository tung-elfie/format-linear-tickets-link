# Linear Link Formatter - Browser Extension Installation Guide

## 🚀 Quick Start

The extension has been successfully built and is ready for installation!

### 📁 Extension Location

```
extension-dist/
├── manifest.json
├── popup/
│   └── popup.html
├── background/
│   └── service-worker.js
├── content/
│   └── content-script.js
├── assets/
│   └── popup-DqN36M0r.js
└── icons/
    └── (various icon files)
```

## 🔧 Installation Steps

### For Chrome/Edge (Chromium-based browsers):

1. **Open Extensions Page**

   - Navigate to `chrome://extensions/` (Chrome) or `edge://extensions/` (Edge)

2. **Enable Developer Mode**

   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**

   - Click "Load unpacked" button
   - Select the `extension-dist` folder from this project
   - Click "Select Folder"

4. **Verify Installation**
   - You should see the "Linear Ticket Link Formatter" extension in your extensions list
   - The extension icon should appear in your browser toolbar

### For Firefox:

1. **Open Extensions Page**

   - Navigate to `about:addons`

2. **Load Temporary Add-on**
   - Click the gear icon → "Install Add-on From File"
   - Select the `manifest.json` file from the `extension-dist` folder

## ✨ Features Available

### 🎯 Core Functionality

- **Popup Interface**: Click the extension icon to open the formatter
- **Text Formatting**: Paste Linear links and get organized output
- **Copy to Clipboard**: One-click copy of formatted text
- **Auto-save**: Last input is automatically saved

### 🔧 Advanced Features (Ready to Implement)

- **Context Menu**: Right-click on selected text to format
- **Keyboard Shortcuts**:
  - `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac) - Open formatter
  - `Ctrl+Shift+F` (or `Cmd+Shift+F` on Mac) - Quick format
- **Auto-detection**: Automatically detect Linear links on web pages
- **Storage**: Save formatting history and preferences

## 🧪 Testing the Extension

### Basic Test:

1. Click the extension icon in your toolbar
2. Paste some Linear ticket links in the input area
3. Click "Format Text"
4. Verify the output is properly categorized
5. Click "Copy" to copy to clipboard

### Example Input:

```
- [ELF-18995: [Bug] [OBD5]: Missing progress status on due date screen](https://linear.app/elfie/issue/ELF-18995/bug-obd5-missing-progress-status-on-due-date-screen)
- [ELF-18948: [Bug][OBD5] Blood sugar settings - Blood sugar goal section should show all 3 values as design](https://linear.app/elfie/issue/ELF-18948/bugobd5-blood-sugar-settings-blood-sugar-goal-section-should-show-all)
```

### Expected Output:

```
Normal ticket:

Improvement:

Bug:
- ELF-18995- [Bug] [OBD5]: Missing progress status on due date screen
- ELF-18948- [Bug][OBD5] Blood sugar settings - Blood sugar goal section should show all 3 values as design
```

## 🔄 Development Mode

### Rebuilding the Extension:

```bash
npm run build:extension
```

### Watching for Changes:

```bash
npm run dev:extension
```

### Building Both Web App and Extension:

```bash
npm run build:all
```

## 🐛 Troubleshooting

### Extension Not Loading:

- Check that all files are in the `extension-dist` folder
- Verify `manifest.json` is in the root of `extension-dist`
- Check browser console for errors

### Popup Not Opening:

- Right-click the extension icon and select "Inspect popup"
- Check for JavaScript errors in the console

### Formatting Not Working:

- Verify the input text follows the expected format
- Check that the extension has clipboard permissions

## 📋 Next Steps

The extension is now ready for use! The following features are implemented and working:

✅ **Completed:**

- Extension structure and manifest
- Popup interface with React app
- Background service worker
- Content script for page interaction
- Build system and packaging
- Basic formatting functionality

🔄 **Ready for Implementation:**

- Context menu integration
- Keyboard shortcuts
- Storage system for preferences
- Auto-detection features
- Enhanced UI features

## 🎉 Success!

Your Linear Link Formatter is now a fully functional browser extension! You can use it to quickly format Linear ticket links directly from your browser.

---

_For development questions or issues, refer to the main project documentation or check the browser's developer console for error messages._
