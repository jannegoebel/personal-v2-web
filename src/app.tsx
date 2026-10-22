import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./lib/api/client";
import { ThemeProvider } from "./lib/contexts/theme-context/theme-provider";
import ErrorPage from "./lib/components/pages/error-page/error-page";

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultErrorComponent: ErrorPage,
});

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
