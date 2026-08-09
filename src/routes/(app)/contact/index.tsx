import { createFileRoute } from "@tanstack/react-router";
import Contact from "../../../pages/contact";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileImagesOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import { matchQuery } from "../../../lib/api/match-query";
import LoadingPage from "../../../lib/components/pages/loading-page/loading.page";

export const Route = createFileRoute("/(app)/contact/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getUserProfileImagesOptions());
  },
});

function RouteComponent() {
  const landmarksQuery = useQuery(getUserProfileImagesOptions());

  return matchQuery(landmarksQuery, {
    loading: LoadingPage,
    success: (profileImages) => <Contact profileImages={profileImages} />,
  });
}
