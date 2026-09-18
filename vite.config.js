import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const target = env.VITE_API_URL || "https://api.durgagenerator.com";

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5174,
      proxy: {
        "/api": {
          target,
          changeOrigin: true,
          secure: false,
        },
        "/uploads": {
          target,
          changeOrigin: true,
          secure: false,
        },
        "/assets": {
          target,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
