import { defineConfig, mergeConfig } from "vitest/config";
import { defineConfig as defineViteConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const viteConfig = defineViteConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@/components": path.resolve(__dirname, "./components"),
      "@/lib": path.resolve(__dirname, "./lib"),
      "@/styles": path.resolve(__dirname, "./styles"),
    },
  },
});

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./tests/setup.ts",
      exclude: [
        "tests/visual/**",
        "playwright-report/**",
        "tests-results/**",
        "node_modules/**",
        ".next/**",
        "dist/**",
      ],
    },
  })
);
