import { createFileRoute, HeadContent } from "@tanstack/react-router";
import Home from "../../pages/home/home";
import { personSchema } from "../../lib/functions/search-engine-optimization";
import { frontendUrl } from "../../lib/functions/environments";
import { differenceInYears } from "date-fns";

export const Route = createFileRoute("/(app)/")({
  head: () => {
    const title = "Janne Göbel";
    const description = `Janne Göbel ist ein ${differenceInYears(new Date(), new Date("1999-12-30"))}-jähriger Softwareentwickler aus dem Schwarzwald, Deutschland. Hier finden Sie alles über seine Sofware-Projekte, Werdegang sowie diverse verschiedene private Einblicke.`;
    const url = `${frontendUrl}/`;

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
          href: "/favicon.svg",
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
      <Home />
    </>
  ),
});
