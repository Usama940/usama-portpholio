import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Manual chunk splitting strategy:
 * - pdf-libs: jspdf + pdfjs-dist + pdf-lib (heavy, ~3MB combined)
 * - doc-libs: mammoth (Word processing)
 * - image-libs: browser-image-compression
 * - qr-libs: qrcode
 * - vendor: react + react-dom + react-router-dom
 * - motion: framer-motion
 *
 * This ensures the QR generator page does NOT load PDF libraries,
 * and the password generator loads none of the above.
 * Each tool's heavy dependency is only fetched when that tool is visited.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    manifest: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // PDF processing libraries — only loaded by PDF tool pages
          if (
            id.includes("jspdf") ||
            id.includes("pdfjs-dist") ||
            id.includes("pdf-lib")
          ) {
            return "chunk-pdf-libs";
          }
          // Word document processing
          if (id.includes("mammoth")) {
            return "chunk-doc-libs";
          }
          // Image compression
          if (id.includes("browser-image-compression")) {
            return "chunk-image-libs";
          }
          // QR code generation
          if (id.includes("qrcode")) {
            return "chunk-qr-libs";
          }
          // File saving utility
          if (id.includes("file-saver")) {
            return "chunk-file-saver";
          }
          // Animation library
          if (id.includes("framer-motion")) {
            return "chunk-motion";
          }
          // React core
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/") ||
            id.includes("node_modules/react-helmet-async/")
          ) {
            return "chunk-vendor";
          }
        },
      },
    },
  },
});
