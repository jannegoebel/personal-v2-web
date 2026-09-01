import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import { queryClient } from "./lib/api/client";
import { client as publicClient } from "./lib/api/public/client.gen";
import "./lib/internationalization/i18n";
import { backendKey, backendUrl } from "./lib/functions/environments";

publicClient.setConfig({
  baseUrl: backendUrl,
  headers: {
    "x-api-key": backendKey,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
