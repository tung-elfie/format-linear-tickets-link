import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "extension-dist",
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, "extension/popup/popup.html"),
        background: path.resolve(
          __dirname,
          "extension/background/service-worker.js"
        ),
        content: path.resolve(__dirname, "extension/content/content-script.js"),
        "popup-css": path.resolve(__dirname, "extension/popup/popup.css"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "background") {
            return "background/service-worker.js";
          }
          if (chunkInfo.name === "content") {
            return "content/content-script.js";
          }
          return "assets/[name]-[hash].js";
        },
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "popup.html") {
            return "popup/popup.html";
          }
          if (assetInfo.name === "popup.css") {
            return "popup/popup.css";
          }
          return "assets/[name]-[hash].[ext]";
        },
      },
    },
    // Ensure we don't minify the service worker
    minify: (file, code) => {
      if (file.endsWith("service-worker.js")) {
        return { code, map: null };
      }
      return null;
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
  },
  publicDir: "extension/assets",
});
