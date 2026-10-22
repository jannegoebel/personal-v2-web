import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import Layout from "../lib/components/layout/layout";
import ErrorPage from "../lib/components/pages/error-page/error-page";

type RootRouteContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
  errorComponent: () => (
    <div className="w-full h-full grid place-items-center">
      <ErrorPage />
    </div>
  ),
});

function RootComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
