import type z from "zod";
import type {
  zGetQuizQuestionDetailsResponse,
  zGetQuizQuestionsOverviewResponse,
} from "../../lib/api/public/zod.gen";
import GameProvider from "./_game-context/game-provider";
import StageSelector from "./_stage-selector";

export type Session = z.infer<
  typeof zGetQuizQuestionsOverviewResponse.shape.payload
>;
export type Question = z.infer<
  typeof zGetQuizQuestionDetailsResponse.shape.payload
>;
export type Answer = Question["answers"][number];

type Props = {
  session: Session;
  onRestart: () => Promise<unknown>;
};

export default function Quiz({ session, onRestart }: Props) {
  return (
    <GameProvider session={session} onRestart={onRestart}>
      <StageSelector />
    </GameProvider>
  );
}
