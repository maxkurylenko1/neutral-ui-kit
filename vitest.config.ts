import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react() as any],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
    exclude: [
      "tests/visual/**",
      "playwright-report/**",
      "test-results/**",
      "node_modules/**",
      ".next/**",
      "dist/**",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@/components": path.resolve(__dirname, "./components"),
      "@/lib": path.resolve(__dirname, "./lib"),
      "@/styles": path.resolve(__dirname, "./styles"),
    },
  },
});
