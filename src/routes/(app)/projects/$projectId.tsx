import { createFileRoute, useParams } from "@tanstack/react-router";
import { getProjectDetailsOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { matchQuery } from "../../../lib/api/match-query";
import ProjectDetails from "../../../pages/projects/details/details";
import LoadingPage from "../../../lib/components/pages/loading-page/loading.page";

export const Route = createFileRoute("/(app)/projects/$projectId")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      getProjectDetailsOptions({ path: { projectId: params.projectId } }),
    );
  },
});

function RouteComponent() {
  const { projectId } = useParams({ strict: false });
  const projectsQuery = useQuery(
    getProjectDetailsOptions({ path: { projectId } }),
  );

  return matchQuery(projectsQuery, {
    loading: LoadingPage,
    success: (project) => <ProjectDetails project={project} />,
  });
}
