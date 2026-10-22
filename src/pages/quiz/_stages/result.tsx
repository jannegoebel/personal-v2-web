import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../../../lib/components/button/button";
import CenteredPage from "../../../lib/components/pages/centered-page/centered-page";
import Sparks from "../_sparks/sparks";
import useGame from "../_game-context/use-game";
import { getLevelName } from "../_game-context/_utils";

export default function Result() {
  const { t } = useTranslation();
  const { currentLevel, session, isRestarting, handleRestart } = useGame();

  const displayLevel = currentLevel + 1;

  return (
    <CenteredPage className="relative auto-rows-auto p-2">
      <Sparks level={displayLevel} maxLevel={session.length} />
      <div className="relative z-1 w-full max-w-[80ch] flex flex-col items-center gap-4">
        <div className="w-full grid place-items-center gap-1 p-4 bg-orange-500 border-2 border-orange-300">
          <h1 className="text-3xl text-black font-bold">
            {getLevelName(currentLevel + 1, t)}
          </h1>
        </div>
        <Button
          leftIcon={<RotateCcw className="w-4" />}
          label={
            displayLevel < session.length
              ? t("quiz:content.retry")
              : t("quiz:content.startAgain")
          }
          onClick={handleRestart}
          disabled={isRestarting}
        />
      </div>
    </CenteredPage>
  );
}
