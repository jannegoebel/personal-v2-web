import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import { queryClient } from "./lib/api/client";
import { client as publicClient } from "./lib/api/public/client.gen";
import "./lib/internationalization/i18n";

publicClient.setConfig({
  baseUrl: (import.meta.env.VITE_BACKEND_URL ?? "").replace(/\/+$/, ""),
  headers: {
    "x-api-key": import.meta.env.VITE_BACKEND_KEY,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
