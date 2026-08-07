import useGame from "./_game-context/use-game";
import Intro from "./_stages/intro";
import Result from "./_stages/result";
import Running from "./_stages/running";

export default function StageSelector() {
  const { currentStage } = useGame();

  switch (currentStage) {
    case "intro":
      return <Intro />;
    case "running":
      return <Running />;
    case "result":
      return <Result />;
    default: {
      const _exhaustiveCheck: never = currentStage;
      throw new Error(`Unknown game stage: ${_exhaustiveCheck}`);
    }
  }
}
