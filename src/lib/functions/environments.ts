// Frontend URL without trailing "/"
export const frontendUrl = (import.meta.env.VITE_FRONTEND_URL ?? "").replace(
  /\/+$/,
  "",
);
// Backend URL without trailing "/"
export const backendUrl = (import.meta.env.VITE_BACKEND_URL ?? "").replace(
  /\/+$/,
  "",
);
export const backendKey = import.meta.env.VITE_BACKEND_KEY ?? "";
