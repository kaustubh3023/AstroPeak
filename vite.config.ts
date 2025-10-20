import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { cartographer } from "@replit/vite-plugin-cartographer";

const isRepl = process.env.REPL_ID !== undefined;
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(isDev && isRepl ? [cartographer()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(new URL("../client/src", import.meta.url).pathname),
      "@shared": path.resolve(new URL("../shared", import.meta.url).pathname),
      "@assets": path.resolve(new URL("../attached_assets", import.meta.url).pathname),
    },
  },
  root: path.resolve(new URL("../client", import.meta.url).pathname),
  build: {
    outDir: path.resolve(new URL("../dist/public", import.meta.url).pathname),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      "/api": {
        target: "http://localhost:5500",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
