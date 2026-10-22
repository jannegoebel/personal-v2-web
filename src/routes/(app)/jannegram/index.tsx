import { createFileRoute, HeadContent } from "@tanstack/react-router";
import JanneGram from "../../../pages/jannegram/jannegram";
import { getLandmarksOverviewOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { matchQuery } from "../../../lib/api/match-query";
import LoadingPage from "../../../lib/components/pages/loading-page/loading-page";
import { frontendUrl } from "../../../lib/functions/environments";
import { personSchema } from "../../../lib/functions/search-engine-optimization";
import ErrorPage from "../../../lib/components/pages/error-page/error-page";

export const Route = createFileRoute("/(app)/jannegram/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getLandmarksOverviewOptions());
  },
  head: () => {
    const title = "jannegram | Janne Göbel";
    const description =
      "Bei janneGram finden Sie verschiedene Eindrücke von Reisen, Eishockey oder dem alltäglichen Leben von Janne Göebel.";
    const url = `${frontendUrl}/jannegram`;

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
  const landmarksQuery = useQuery(getLandmarksOverviewOptions());

  return matchQuery(landmarksQuery, {
    loading: () => <LoadingPage />,
    error: () => <ErrorPage />,
    success: (landmarks) => <JanneGram landmarks={landmarks} />,
  });
}
