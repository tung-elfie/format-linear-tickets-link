<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Link Formatter

A React application for formatting Linear ticket links into organized markdown lists. This tool helps categorize and format Linear tickets by type (Bug, Improvement, Normal) for better documentation and tracking.

## Features

- 📝 Format Linear ticket links from markdown format
- 🏷️ Automatically categorize tickets by type (Bug, Improvement, Normal)
- 📋 Copy formatted output to clipboard
- 🎨 Modern, responsive UI with dark theme
- ⚡ Fast and lightweight React application

## Live Demo

🌐 **View the live application:** [https://tung-elfie.github.io/format-linear-tickets-link/](https://tung-elfie.github.io/format-linear-tickets-link/)

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
link-formatter/
├── src/
│   ├── App.tsx          # Main application component
│   └── index.tsx        # Application entry point
├── public/
│   └── index.html       # HTML template
├── dist/                # Build output (auto-generated)
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via CDN)
- **GitHub Pages** - Hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
