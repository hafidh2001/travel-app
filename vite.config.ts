import { defineConfig, splitVendorChunkPlugin } from "vite";
import * as path from "path";
import * as process from "process";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
// import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8000
  },
  base: "/",
  // https://www.raulmelo.dev/til/how-to-fix-resolve-alias-problem-in-vite-js
  resolve: {
    alias: [
      {
        find: "src",
        replacement: path.join(process.cwd(), "src"),
      },
      {
        find: "types",
        replacement: path.join(process.cwd(), "types"),
      },
      {
        find: /~(.+)/,
        replacement: path.join(process.cwd(), "node_modules/$1"),
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  plugins: [
    react({
      tsDecorators: true,
    }),
    tsconfigPaths(),
    splitVendorChunkPlugin(),
  ],
});
