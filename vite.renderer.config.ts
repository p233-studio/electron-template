import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import cssnano from "cssnano";

interface ModulesConfig {
  generateScopedName: string;
  getJSON?: (file: string, json: Record<string, string>) => void;
}

let modulesConfig: ModulesConfig = {
  generateScopedName: "[local]-[hash:base64:4]"
};

if (process.env.NODE_ENV === "production") {
  const fileSet = new Set<string>();
  const hashSet = new Set<string>();

  modulesConfig = {
    getJSON(file: string, json: Record<string, string>): void {
      if (fileSet.has(file)) return;

      fileSet.add(file);
      Object.values(json).forEach((hash: string) => {
        if (hashSet.has(hash)) {
          throw new Error("CSS MODULES HASH COLLISION ERROR");
        }
        hashSet.add(hash);
      });
    },
    generateScopedName: "[hash:base64:2]"
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    react(),
    svgr({
      include: "./src/renderer/assets/*.svg?react",
      svgrOptions: {
        dimensions: false,
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"]
      }
    })
  ],
  css: {
    modules: modulesConfig,
    postcss: {
      plugins: [
        cssnano({ preset: ["cssnano-preset-advanced", { discardUnused: { fontFace: false } }] })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/common" as *;`
      }
    }
  },
  resolve: {
    alias: [{ find: "~", replacement: "/src/renderer" }]
  }
});
