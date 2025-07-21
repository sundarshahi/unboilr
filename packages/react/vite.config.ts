import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "lib",
      tsconfigPath: path.join(__dirname, "tsconfig.lib.json"),
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "ContextBuilder",
      formats: ["es", "umd"],
      fileName: (format) => `context-builder.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
