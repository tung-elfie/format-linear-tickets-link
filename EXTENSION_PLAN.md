# Web Extension Development Plan & Todo List

## Project Overview

Converting the Linear ticket link formatter React app into a browser extension with enhanced functionality and seamless browser integration.

## Current Status: Phase 1-3 Complete ✅ - Ready for Phase 4

---

## Phase 1: Foundation Setup 🏗️

### 1.1 Extension Structure Setup

- [x] Create `manifest.json` with Manifest V3 configuration
- [x] Set up proper directory structure for extension files
- [x] Configure permissions for clipboard access and storage
- [x] Add extension icons and assets (16x16, 32x32, 48x48, 128x128)

### 1.2 Build System Configuration

- [x] Modify `vite.config.ts` to support extension building
- [x] Create separate entry points for popup, background, and content scripts
- [x] Set up build targets for both web app and extension
- [x] Configure output directories and file naming
- [x] Add extension-specific build scripts to package.json

**Dependencies Added:**

- ✅ `@types/chrome` - TypeScript definitions for Chrome extension APIs
- ✅ `webextension-polyfill` - Cross-browser compatibility
- ✅ `zip-folder` - Extension packaging

---

## Phase 2: Core Extension Components ⚙️

### 2.1 Popup Interface

- [x] Adapt existing React app for extension popup
- [x] Optimize UI for small popup window (400x600px)
- [x] Ensure responsive design works in extension context
- [x] Add extension-specific styling and layout
- [x] Test popup functionality and user experience

### 2.2 Background Script (Service Worker)

- [x] Create service worker for extension lifecycle
- [x] Handle extension installation and updates
- [x] Manage storage and user preferences
- [x] Implement message passing between components
- [x] Add error handling and logging

### 2.3 Content Script

- [x] Add content script for page interaction
- [x] Detect Linear links on web pages
- [x] Provide auto-format suggestions
- [x] Handle text selection and context menu integration
- [x] Test on various websites with Linear links

---

## Phase 3: Enhanced Features 🚀

### 3.1 Context Menu Integration

- [x] Add right-click context menu options
- [x] Format selected text directly from context menu
- [x] Quick access to formatter without opening popup
- [x] Test context menu on different page types

### 3.2 Keyboard Shortcuts

- [x] Implement keyboard shortcuts for quick access
- [x] Add hotkey for opening formatter (Ctrl+Shift+L)
- [x] Shortcut for quick format action (Ctrl+Shift+F)
- [x] Configure shortcuts in manifest.json

### 3.3 Storage System

- [x] Implement Chrome storage API
- [x] Save user preferences and settings
- [x] Store formatting history (last 20 formats)
- [x] Add settings panel for customization
- [x] Enhanced storage with history management

---

## Phase 4: Advanced Functionality 🔧

### 4.1 Auto-Detection Features

- [ ] Detect Linear links on current page
- [ ] Offer one-click formatting
- [ ] Smart text recognition and formatting
- [ ] Add notification system for detected links
- [ ] Implement smart suggestions

### 4.2 Enhanced UI Features

- [ ] Add settings panel for customization
- [ ] Implement dark/light theme toggle
- [ ] Add export/import functionality
- [ ] Create help and tutorial system
- [ ] Add keyboard navigation support

---

## Phase 5: Build & Distribution 📦

### 5.1 Build System

- [x] Create automated build scripts
- [x] Set up development and production builds
- [x] Configure packaging for different browsers
- [x] Add build validation and testing
- [x] Create extension packaging script

### 5.2 Testing & Quality Assurance

- [ ] Set up extension testing environment
- [ ] Test on Chrome, Edge, and Firefox
- [ ] Validate all features and permissions
- [ ] Performance testing and optimization
- [ ] User acceptance testing

### 5.3 Documentation & Deployment

- [x] Update README with extension instructions
- [x] Create installation guide
- [ ] Document all features and usage
- [ ] Prepare for Chrome Web Store submission
- [ ] Create store listing materials

---

## Phase 6: Browser Compatibility 🌐

### 6.1 Multi-Browser Support

- [ ] Ensure Chrome/Chromium compatibility
- [ ] Test Edge browser support
- [ ] Add Firefox-specific configurations
- [ ] Handle browser-specific APIs
- [ ] Test on different operating systems

### 6.2 Store Preparation

- [ ] Create store listing materials
- [ ] Prepare screenshots and descriptions
- [ ] Set up developer accounts
- [ ] Create privacy policy and terms
- [ ] Submit to Chrome Web Store

---

## Technical Architecture

```
extension/
├── manifest.json              # Extension configuration
├── popup/
│   ├── popup.html            # Popup entry point
│   ├── popup.tsx             # React app for popup
│   └── popup.css             # Popup-specific styles
├── background/
│   └── service-worker.js     # Background script
├── content/
│   └── content-script.js     # Page interaction script
├── assets/
│   ├── icons/                # Extension icons
│   └── images/               # UI assets
└── utils/
    ├── storage.js            # Storage utilities
    ├── messaging.js          # Message passing
    └── formatter.js          # Core formatting logic
```

---

## File Structure Changes

### New Files to Create:

- `extension/manifest.json`
- `extension/popup/popup.html`
- `extension/popup/popup.tsx`
- `extension/background/service-worker.js`
- `extension/content/content-script.js`
- `extension/assets/icons/` (icon files)
- `extension/utils/storage.js`
- `extension/utils/messaging.js`
- `extension/utils/formatter.js`
- `vite.extension.config.ts`
- `scripts/build-extension.js`
- `scripts/package-extension.js`

### Files to Modify:

- `vite.config.ts` - Add extension build configuration
- `package.json` - Add extension build scripts and dependencies
- `App.tsx` - Adapt for popup use
- `README.md` - Add extension documentation

---

## Dependencies to Add

```json
{
  "devDependencies": {
    "@types/chrome": "^0.0.254",
    "webextension-polyfill": "^0.10.0",
    "zip-folder": "^1.0.0"
  }
}
```

---

## Build Scripts to Add

```json
{
  "scripts": {
    "build:extension": "vite build --config vite.extension.config.ts",
    "build:all": "npm run build && npm run build:extension",
    "package:extension": "node scripts/package-extension.js",
    "dev:extension": "vite build --config vite.extension.config.ts --watch"
  }
}
```

---

## Testing Checklist

### Functionality Tests:

- [x] Popup opens and displays correctly
- [x] Formatting works in popup
- [x] Copy to clipboard works
- [x] Context menu appears on right-click
- [x] Keyboard shortcuts work
- [x] Storage saves and loads preferences
- [x] Content script detects Linear links
- [x] Auto-format suggestions work

### Browser Compatibility:

- [ ] Chrome (latest)
- [ ] Edge (latest)
- [ ] Firefox (latest)
- [ ] Chrome (older versions)

### Performance Tests:

- [ ] Extension loads quickly
- [ ] Memory usage is reasonable
- [ ] No memory leaks
- [ ] Responsive UI

---

## Success Criteria

### Must Have:

- ✅ Popup interface with existing formatting functionality
- ✅ Context menu integration
- ✅ Keyboard shortcuts
- ✅ Enhanced storage for preferences and history
- [ ] Works on Chrome, Edge, Firefox

### Should Have:

- ✅ Auto-detection of Linear links
- ✅ Settings panel
- ✅ Formatting history
- [ ] Dark/light theme support

### Could Have:

- [ ] Cross-device sync
- ✅ Advanced auto-formatting
- [ ] Tutorial system
- [ ] Export/import functionality

---

## Timeline Estimate

- **Phase 1-2**: 2-3 days (Core setup and basic functionality)
- **Phase 3**: 1-2 days (Enhanced features)
- **Phase 4**: 2-3 days (Advanced functionality)
- **Phase 5-6**: 1-2 days (Build and testing)

**Total Estimated Time: 6-10 days**

---

## Notes & Decisions

### Key Decisions Made:

- Using Manifest V3 for modern extension support
- Keeping existing React app as popup interface
- Adding content script for page interaction
- Implementing Chrome storage for user preferences
- Supporting multiple browsers from the start

### Technical Considerations:

- Popup size limitations (400x600px max)
- Service worker limitations (no persistent background)
- Content script injection timing
- Cross-origin restrictions
- Storage quota limitations

---

## Next Steps

1. ✅ **Phase 1.1 Complete** - Created manifest.json and basic structure
2. ✅ **Phase 1.2 Complete** - Set up build system and Vite configuration
3. ✅ **Phase 2.1 Complete** - Adapted React app for popup interface
4. ✅ **Phase 2.2 Complete** - Created background service worker
5. ✅ **Phase 2.3 Complete** - Implemented content script
6. ✅ **Phase 3.1 Complete** - Context menu integration with enhanced options
7. ✅ **Phase 3.2 Complete** - Keyboard shortcuts (Ctrl+Shift+L, Ctrl+Shift+F)
8. ✅ **Phase 3.3 Complete** - Enhanced storage system with history and settings
9. ✅ **Phase 5.1 Complete** - Build system and packaging
10. 🔄 **Next: Phase 4** - Add advanced features and UI enhancements

---

_Last Updated: December 15, 2024_
_Status: Phase 1-3 Complete ✅ - Extension Ready for Phase 4 Advanced Features_

## 🎉 Current Achievement Summary

### ✅ **Completed (Phase 1-3)**

- **Extension Foundation**: Complete manifest.json with Manifest V3
- **Build System**: Automated Vite configuration for extension building
- **Popup Interface**: React app adapted for 400x600px popup window
- **Background Service Worker**: Extension lifecycle and message handling
- **Content Script**: Page interaction and Linear link detection
- **Utility Functions**: Storage, messaging, and formatting utilities
- **Build & Packaging**: Automated build scripts and extension packaging
- **Documentation**: Installation guide and project documentation
- **Context Menu Integration**: Enhanced right-click menu with multiple options
- **Keyboard Shortcuts**: Ctrl+Shift+L and Ctrl+Shift+F hotkeys
- **Enhanced Storage System**: History management and user preferences
- **Settings Panel**: Configurable options for auto-detect, notifications, history

### 🎯 **Phase 3 Implementation Details**

#### **Context Menu Features:**

- **🔧 Format Linear Links**: Right-click selected text → opens popup with text pre-loaded
- **⚡ Quick Format & Copy**: Right-click selected text → formats and copies to clipboard instantly
- **📝 Open Linear Formatter**: Right-click anywhere → opens the formatter popup
- **🔍 Detect Linear Links on Page**: Right-click anywhere → scans page for Linear links with notifications

#### **Keyboard Shortcuts:**

- **Ctrl+Shift+L** (Cmd+Shift+L on Mac): Open formatter popup
- **Ctrl+Shift+F** (Cmd+Shift+F on Mac): Quick format selected text

#### **Enhanced Storage System:**

- **Formatting History**: Automatically saves last 20 formatting operations with timestamps
- **User Preferences**: Settings for auto-detect, notifications, history size, theme
- **Persistent Storage**: All data saved across browser sessions
- **History Management**: View, load, and clear formatting history from popup

#### **Popup UI Enhancements:**

- **📚 History Panel**: Click book icon to view and load from formatting history
- **⚙️ Settings Panel**: Click gear icon to configure preferences
- **Smart History Display**: Shows last 5 items with timestamps and preview
- **Settings Controls**: Toggle auto-detect, notifications, and adjust history size
- **Responsive Design**: Panels collapse/expand smoothly

### 🔄 **Ready for Phase 4**

- Advanced auto-detection features
- Enhanced UI with theme support
- Smart text recognition
- Notification system improvements

### 📁 **Extension Structure Created**

```
extension-dist/
├── manifest.json              # ✅ Extension configuration
├── popup/
│   ├── popup.html            # ✅ Popup entry point
│   └── popup.tsx             # ✅ React app for popup
├── background/
│   └── service-worker.js     # ✅ Background script
├── content/
│   └── content-script.js     # ✅ Page interaction script
├── assets/
│   └── popup-DqN36M0r.js     # ✅ Compiled React bundle
└── icons/
    └── (various icon files)   # ✅ Extension icons
```

### 🚀 **Installation Ready**

The extension is fully built and ready for installation in Chrome/Edge browsers. See `EXTENSION_INSTALLATION.md` for detailed setup instructions.
