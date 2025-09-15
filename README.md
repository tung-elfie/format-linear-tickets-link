# Linear Ticket Link Formatter

A React application and browser extension for formatting Linear ticket links into organized markdown lists. This tool helps categorize and format Linear tickets by type (Bug, Improvement, Normal) for better documentation and tracking.

## Features

### Web Application

- 📝 Format Linear ticket links from markdown format
- 🏷️ Automatically categorize tickets by type (Bug, Improvement, Normal)
- 📋 Copy formatted output to clipboard
- 🎨 Modern, responsive UI with dark theme
- ⚡ Fast and lightweight React application

### Browser Extension

- 🚀 **Chrome/Edge Extension** - Right-click context menu integration
- 📋 **Clipboard Integration** - Automatically paste clipboard content
- ⌨️ **Keyboard Shortcuts** - Ctrl+Shift+L and Ctrl+Shift+F
- 🎯 **Quick Access** - Format text without opening a new tab
- 💾 **Persistent Storage** - Saves your formatting history
- 🔧 **Smart Detection** - Works with selected text or clipboard data

## Live Demo

🌐 **View the live application:** [https://tung-elfie.github.io/format-linear-tickets-link/](https://tung-elfie.github.io/format-linear-tickets-link/)

## Browser Extension

### Installation

1. **Download the extension:**

   ```bash
   git clone https://github.com/tung-elfie/format-linear-tickets-link.git
   cd format-linear-tickets-link
   ```

2. **Build the extension:**

   ```bash
   # Quick build
   ./quick-deploy.sh

   # Or use npm
   npm run deploy:quick
   ```

3. **Install in Chrome/Edge:**
   - Open `chrome://extensions/` (or `edge://extensions/`)
   - Enable **Developer mode** (toggle in top right)
   - Click **Load unpacked**
   - Select the `extension-dist` folder

### Usage

- **Right-click anywhere** → "Linear Ticket Link Formatter"
- **Select text** and right-click → Uses selected text
- **No selection** → Automatically uses clipboard content
- **Keyboard shortcuts:**
  - `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac) - Open formatter
  - `Ctrl+Shift+F` (or `Cmd+Shift+F` on Mac) - Quick format

## Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tung-elfie/format-linear-tickets-link.git
   cd format-linear-tickets-link
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application.

## Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages. Follow these steps to deploy:

### Prerequisites

- A GitHub account
- The repository must be public (for free GitHub Pages hosting)

### Deployment Steps

1. **Fork or clone this repository** to your GitHub account

2. **Enable GitHub Pages:**

   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Deploy manually (if needed):**

   ```bash
   # Build the project
   npm run build

   # Deploy to GitHub Pages
   npm run deploy
   ```

4. **Automatic deployment:**
   - The project is configured to deploy automatically on every push to the `main` branch
   - Your app will be available at: `https://[your-username].github.io/format-linear-tickets-link/`

### Configuration Details

The project includes:

- **Vite configuration** with proper base path for GitHub Pages
- **GitHub Actions workflow** for automatic deployment
- **gh-pages** package for manual deployment
- **Proper build scripts** in `package.json`

### Troubleshooting Deployment

If deployment fails:

1. Check that your repository is public
2. Verify GitHub Pages is enabled in repository settings
3. Ensure the `main` branch is set as the source
4. Check the Actions tab for any deployment errors

## Project Structure

```
format-linear-tickets-link/
├── src/                          # Web application source
│   ├── App.tsx                   # Main application component
│   └── index.tsx                 # Application entry point
├── extension/                    # Browser extension source
│   ├── manifest.json             # Extension configuration
│   ├── popup/                    # Extension popup
│   │   ├── popup.html            # Popup HTML
│   │   ├── popup.tsx             # Popup React component
│   │   └── popup.css             # Popup styles
│   ├── background/               # Background script
│   │   └── service-worker.js     # Service worker
│   ├── content/                  # Content script
│   │   └── content-script.js     # Page interaction script
│   └── assets/                   # Extension assets
│       └── icons/                # Extension icons
├── extension-dist/               # Extension build output
├── dist/                        # Web app build output
├── scripts/                     # Build scripts
│   └── build-extension.js       # Extension build script
├── deploy.sh                    # Smart deploy script
├── quick-deploy.sh              # Quick deploy script
├── package.json                 # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── vite.extension.config.ts    # Extension Vite config
└── README.md                   # This file
```

## Available Scripts

### Web Application

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

### Browser Extension

- `npm run build:extension` - Build the extension
- `npm run deploy:extension` - Smart deploy (checks for changes)
- `npm run deploy:quick` - Quick deploy (always rebuilds)
- `./deploy.sh` - Smart deploy script with change detection
- `./quick-deploy.sh` - Quick deploy script for fast iteration

### Deploy Scripts

#### Smart Deploy (`./deploy.sh`)

- ✅ **Change Detection** - Only rebuilds when files change
- ✅ **Build Verification** - Checks all required files exist
- ✅ **Deployment Instructions** - Shows step-by-step install guide
- ✅ **Force Rebuild** - `./deploy.sh --force` to always rebuild

#### Quick Deploy (`./quick-deploy.sh`)

- ⚡ **Always Rebuilds** - No change detection
- ⚡ **Fast Execution** - Quick for rapid development
- ⚡ **Simple Output** - Clean, minimal messages

## Technologies Used

### Web Application

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via CDN)
- **GitHub Pages** - Hosting

### Browser Extension

- **Chrome Extension APIs** - Extension functionality
- **Manifest V3** - Modern extension standard
- **Service Workers** - Background processing
- **Content Scripts** - Page interaction
- **Chrome Storage API** - Data persistence
- **Chrome Scripting API** - Clipboard access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
