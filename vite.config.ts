import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, "src/web/"),
  build: {
    outDir: path.resolve(__dirname, "./build"),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@/web": path.resolve(__dirname, "./src/web/"),
    },
  },
});
