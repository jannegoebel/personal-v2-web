import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { matchQuery } from "../../../lib/api/match-query";
import { getTimelineOverviewOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import LoadingPage from "../../../lib/components/pages/loading-page/loading.page";
import ResumeOverview from "../../../pages/resume/resume";

export const Route = createFileRoute("/(app)/resume/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getTimelineOverviewOptions());
  },
});

function RouteComponent() {
  const timelineQuery = useQuery(getTimelineOverviewOptions());

  return matchQuery(timelineQuery, {
    loading: LoadingPage,
    success: (resume) => <ResumeOverview resume={resume} />,
  });
}
