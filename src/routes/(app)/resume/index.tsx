import { useQuery } from "@tanstack/react-query";
import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { matchQuery } from "../../../lib/api/match-query";
import { getTimelineOverviewOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import LoadingPage from "../../../lib/components/pages/loading-page/loading-page";
import ResumeOverview from "../../../pages/resume/resume";
import { personSchema } from "../../../lib/functions/search-engine-optimization";
import { frontendUrl } from "../../../lib/functions/environments";
import ErrorPage from "../../../lib/components/pages/error-page/error-page";

export const Route = createFileRoute("/(app)/resume/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getTimelineOverviewOptions());
  },
  head: () => {
    const title = "lebenslauf | Janne Göbel";
    const description =
      "Der Werdegang von Janne Göbel von der Schulzeit, über Studium und Ausbildung bis hin zur Festanstellung sowie verschiedene private Lebensabschnitte.";
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
  const timelineQuery = useQuery(getTimelineOverviewOptions());

  return matchQuery(timelineQuery, {
    loading: () => <LoadingPage />,
    error: () => <ErrorPage />,
    empty: () => <ResumeOverview resume={[]} />,
    success: (resume) => <ResumeOverview resume={resume} />,
  });
}
