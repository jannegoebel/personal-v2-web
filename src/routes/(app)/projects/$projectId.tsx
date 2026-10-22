import {
  createFileRoute,
  HeadContent,
  useParams,
} from "@tanstack/react-router";
import { getProjectDetailsOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { matchQuery } from "../../../lib/api/match-query";
import ProjectDetails from "../../../pages/projects/details/details";
import LoadingPage from "../../../lib/components/pages/loading-page/loading-page";
import { personSchema } from "../../../lib/functions/search-engine-optimization";
import { frontendUrl } from "../../../lib/functions/environments";
import ErrorPage from "../../../lib/components/pages/error-page/error-page";

export const Route = createFileRoute("/(app)/projects/$projectId")({
  loader: async ({ params, context }) => {
    const result = await context.queryClient.ensureQueryData(
      getProjectDetailsOptions({ path: { projectId: params.projectId } }),
    );
    return result.payload;
  },
  head: ({ loaderData }) => {
    const projectId = loaderData?.id;
    const projectTitle =
      loaderData?.german.title.toLocaleLowerCase() ?? "projekte";
    const projectMetaDescription = loaderData?.german.metaDescription ?? "N.A.";
    const projectLogo = loaderData?.logo;

    const title = `${projectTitle} | Janne Göbel`;
    const description = projectMetaDescription;
    const url = `${frontendUrl}/projects/${projectId}`;
    const image = projectLogo;

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
          property: "og:image",
          content: image,
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
  const { projectId } = useParams({ strict: false });
  const projectsQuery = useQuery(
    getProjectDetailsOptions({ path: { projectId } }),
  );

  return matchQuery(projectsQuery, {
    loading: () => <LoadingPage />,
    error: () => <ErrorPage />,
    success: (project) => <ProjectDetails project={project} />,
  });
}
