import { useEffect, useState } from "react";
import useGame from "../_game-context/use-game";
import Question from "./_question/question";
import ScoreBoard from "./_score-board/score-board";
import { getLevelName } from "../_game-context/_utils";
import { useTranslation } from "react-i18next";

export default function Level() {
  const { t } = useTranslation();
  const { currentLevel, currentQuestion } = useGame();

  const [showStage, setShowStage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowStage(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const currentLabel = getLevelName(currentLevel + 1, t);

  return (
    <>
      <div
        className={`absolute inset-0 grid place-items-center transition-opacity duration-300 delay-75 ${showStage ? "opacity-100" : "opacity-0"} p-2`}
      >
        <div className="w-full max-w-[80ch] grid place-items-center p-4 border-2 bg-orange-500 border-orange-300">
          <h1 className="text-3xl text-black font-bold">{currentLabel}</h1>
        </div>
      </div>
      <div
        className={`absolute inset-0 grid place-items-center transition-opacity duration-300 delay-75 ${showStage ? "opacity-0" : "opacity-100"}`}
      >
        <div className="hidden w-full lg:grid grid-cols-[1fr_16rem] 2xl:grid-cols-[16rem_1fr_16rem] place-items-center gap-8 p-4 xl:p-8">
          <span className="hidden 2xl:block" />
          <Question question={currentQuestion} />
          <ScoreBoard />
        </div>
        <div className="h-full grid grid-rows-[3rem_1fr_3rem] lg:hidden items-center px-2">
          <p className="w-full text-center whitespace-nowrap text-ellipsis text-orange-500 text-2xl font-bold overflow-hidden">
            {currentLabel}
          </p>
          <Question question={currentQuestion} />
          <ScoreBoard />
        </div>
      </div>
    </>
  );
}
