import { createFileRoute, HeadContent } from "@tanstack/react-router";
import Contact from "../../../pages/contact";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileImagesOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import { matchQuery } from "../../../lib/api/match-query";
import LoadingPage from "../../../lib/components/pages/loading-page/loading-page";
import { frontendUrl } from "../../../lib/functions/environments";
import { personSchema } from "../../../lib/functions/search-engine-optimization";
import ErrorPage from "../../../lib/components/pages/error-page/error-page";

export const Route = createFileRoute("/(app)/contact/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getUserProfileImagesOptions());
  },
  head: () => {
    const title = "kontakt | Janne Göbel";
    const description =
      "Nehmen Sie Kontakt mit Janne Göbel auf oder finden Sie ihn auf LinkedIn, Github oder Spotify";
    const url = `${frontendUrl}/contact`;

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
  const landmarksQuery = useQuery(getUserProfileImagesOptions());

  return matchQuery(landmarksQuery, {
    loading: () => <LoadingPage />,
    error: () => <ErrorPage />,
    success: (profileImages) => <Contact profileImages={profileImages} />,
  });
}
