import { useQuery } from "@tanstack/react-query";
import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { matchQuery } from "../../../lib/api/match-query";
import { getProjectsOverviewOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import LoadingPage from "../../../lib/components/pages/loading-page/loading-page";
import ProjectsOverview from "../../../pages/projects/overview";
import { personSchema } from "../../../lib/functions/search-engine-optimization";
import { frontendUrl } from "../../../lib/functions/environments";
import ErrorPage from "../../../lib/components/pages/error-page/error-page";

export const Route = createFileRoute("/(app)/projects/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getProjectsOverviewOptions());
  },
  head: () => {
    const title = "projekte | Janne Göbel";
    const description =
      "Erfahren Sie mehr über die Software-Projekte von Janne Göbel.";
    const url = `${frontendUrl}/projects`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "robots",
          content: "index, follow",
        },

        // Open Graph
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:url",
          content: url,
        },
        {
          property: "og:site_name",
          content: "Janne Göbel",
        },
      ],
      links: [
        {
          rel: "canonical",
          href: url,
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/images/favicon.svg",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(personSchema),
        },
      ],
    };
  },
  component: () => (
    <>
      <HeadContent />
      <RouteComponent />
    </>
  ),
});

function RouteComponent() {
  const projectsQuery = useQuery(getProjectsOverviewOptions());

  return matchQuery(projectsQuery, {
    loading: () => <LoadingPage />,
    error: () => <ErrorPage />,
    success: (projects) => <ProjectsOverview projects={projects} />,
  });
}
