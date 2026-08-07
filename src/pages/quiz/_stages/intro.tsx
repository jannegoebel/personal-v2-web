import { useTranslation } from "react-i18next";
import Image from "../../../lib/components/image/image";
import CenteredPage from "../../../lib/components/pages/centered-page/centered-page";
import useGame from "../_game-context/use-game";

export default function Intro() {
  const { t } = useTranslation();
  const { handleStart } = useGame();

  return (
    <CenteredPage className="p-0 md:p-0">
      <div className="grid auto-rows-auto place-items-center">
        <button className="cursor-pointer group relative" onClick={handleStart}>
          <Image
            className="w-80 h-80 md:w-160 md:h-160 grayscale-60 group-hover:grayscale-0 transition-all duration-300"
            url="/images/quiz-logo.png"
            noSkeleton
          />
          <div className="absolute inset-0 z-1 grid place-items-center backdrop-blur-md group-hover:backdrop-blur-none transition-all duration-300">
            <p className="text-5xl font-extrabold text-black dark:text-white [text-shadow:-1px_0_0_#fff,1px_0_0_#fff,0_-1px_0_#fff,0_1px_0_#fff,-1px_-1px_0_#fff,1px_-1px_0_#fff,-1px_1px_0_#fff,1px_1px_0_#fff] dark:[text-shadow:-1px_0_0_#000,1px_0_0_#000,0_-1px_0_#000,0_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000] opacity-100 lowercase group-hover:opacity-0 transition-opacity duration-300">
              {t("quiz:content.clickToStart")}
            </p>
          </div>
        </button>
      </div>
    </CenteredPage>
  );
}
