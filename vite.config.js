import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 5173 },
  build: {
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          motion: ["gsap", "lenis"],
        },
      },
    },
  },
});
