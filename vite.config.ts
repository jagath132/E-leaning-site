import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@/components/",
        replacement: path.resolve(__dirname, "Components") + "/",
      },
      { find: "@/api/", replacement: path.resolve(__dirname, "api") + "/" },
      { find: "@/lib/", replacement: path.resolve(__dirname, "src/lib") + "/" },
      { find: "@/utils", replacement: path.resolve(__dirname, "src/utils") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
  server: {
    port: 3000,
  },
});
