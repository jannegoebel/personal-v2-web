import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { heyApiPlugin } from "@hey-api/vite-plugin";

const env = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  "VITE_",
);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    react(),
    heyApiPlugin({
      config: {
        input: `${env.VITE_BACKEND_URL}api/public/docs/openapi.json`,
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
});
