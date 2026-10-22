import { createFileRoute, HeadContent } from "@tanstack/react-router";
import Imprint from "../../pages/imprint";

export const Route = createFileRoute("/(app)/imprint")({
  head: () => {
    const title = "impressum | Janne Göbel";
    const description =
      "Das Impressum der Webseite von Janne Göbel, einem Softwareentwickler aus dem Schwarzwald in Deutschland.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "robots",
          content: "noindex, nofollow",
        },
      ],
    };
  },
  component: () => (
    <>
      <HeadContent />
      <Imprint />
    </>
  ),
});
