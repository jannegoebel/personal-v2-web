import { createFileRoute } from "@tanstack/react-router";
import JanneGram from "../../../pages/jannegram/jannegram";
import { getLandmarksOverviewOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { matchQuery } from "../../../lib/api/match-query";
import LoadingPage from "../../../lib/components/pages/loading-page/loading.page";

export const Route = createFileRoute("/(app)/jannegram/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getLandmarksOverviewOptions());
  },
});

function RouteComponent() {
  const landmarksQuery = useQuery(getLandmarksOverviewOptions());

  return matchQuery(landmarksQuery, {
    loading: LoadingPage,
    success: (landmarks) => <JanneGram landmarks={landmarks} />,
  });
}
