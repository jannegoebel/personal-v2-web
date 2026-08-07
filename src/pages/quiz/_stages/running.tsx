import BlankPage from "../../../lib/components/pages/blank-page/blank-page";
import useGame from "../_game-context/use-game";
import Level from "../_level/level";

export default function Running() {
  const { currentLevel } = useGame();

  return (
    <BlankPage className="relative">
      <Level key={currentLevel} />
    </BlankPage>
  );
}
