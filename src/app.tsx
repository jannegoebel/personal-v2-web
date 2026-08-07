import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./lib/api/client";
import { ThemeProvider } from "./lib/contexts/theme-context/theme-provider";

const router = createRouter({ routeTree, context: { queryClient } });

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
