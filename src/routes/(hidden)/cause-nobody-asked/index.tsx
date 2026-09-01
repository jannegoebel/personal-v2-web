import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { getQuizQuestionsOverviewOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { matchQuery } from "../../../lib/api/match-query";
import LoadingPage from "../../../lib/components/pages/loading-page/loading.page";
import Quiz from "../../../pages/quiz/quiz";

export const Route = createFileRoute("/(hidden)/cause-nobody-asked/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      getQuizQuestionsOverviewOptions(),
    );
  },
  head: () => {
    const title = "wer hat gefragt? | Janne Göbel";
    const description =
      'Ein "Wer wird Millionär?"-artiges Spiel, da allerdings niemand gefragt hat "Wer hat gefragt?".';

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
      <RouteComponent />
    </>
  ),
});

function RouteComponent() {
  const quizQuery = useQuery(getQuizQuestionsOverviewOptions());
  return matchQuery(quizQuery, {
    loading: LoadingPage,
    success: (session) => (
      <Quiz session={session} onRestart={() => quizQuery.refetch()} />
    ),
  });
}
