import { createFileRoute } from "@tanstack/react-router";
import { getQuizQuestionsOverviewOptions } from "../../../lib/api/public/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { matchQuery } from "../../../lib/api/match-query";
import LoadingPage from "../../../lib/components/pages/loading-page/loading.page";
import Quiz from "../../../pages/quiz/quiz";

export const Route = createFileRoute("/(hidden)/cause-nobody-asked/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      getQuizQuestionsOverviewOptions(),
    );
  },
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
