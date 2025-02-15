import { join, resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";

function generateManifest() {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ["package.json", "manifest.json"],
      browser: process.env.TARGET || "firefox",
      additionalInputs: ["src/options/index.html", "src/new-tab/index.html"],
    }),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
      "@/new-tab": join(__dirname, "src/new-tab"),
      "@/options": join(__dirname, "src/options"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        newtab: resolve(__dirname, "src/new-tab/index.html"),
        options: resolve(__dirname, "src/options/index.html"),
      },
      output: {
        inlineDynamicImports: false,
      },
    },
    outDir: "dist",
  },
});
