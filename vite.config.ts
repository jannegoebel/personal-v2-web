import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { heyApiPlugin } from "@hey-api/vite-plugin";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const backendUrl = (env.VITE_BACKEND_URL ?? "").replace(/\/+$/, "");
  return {
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      tailwindcss(),
      react(),
      heyApiPlugin({
        config: {
          input: `${backendUrl}/api/public/docs/openapi.json`,
          output: "src/lib/api/public",
          plugins: [
            "@hey-api/typescript",
            "@hey-api/sdk",
            "@hey-api/client-fetch",
            "zod",
            "@tanstack/react-query",
          ],
        },
        vite: {
          apply: "serve",
        },
      }),
      babel({ presets: [reactCompilerPreset()] }),
    ],
  };
});
