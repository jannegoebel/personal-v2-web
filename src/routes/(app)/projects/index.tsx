import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { matchQuery } from "../../../lib/api/match-query";
import { getProjectsOverviewOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import LoadingPage from "../../../lib/components/pages/loading-page/loading.page";
import ProjectsOverview from "../../../pages/projects/overview";

export const Route = createFileRoute("/(app)/projects/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getProjectsOverviewOptions());
  },
});

function RouteComponent() {
  const projectsQuery = useQuery(getProjectsOverviewOptions());

  return matchQuery(projectsQuery, {
    loading: LoadingPage,
    success: (projects) => <ProjectsOverview projects={projects} />,
  });
}
