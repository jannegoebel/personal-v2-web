import { PhoneIcon, UserIcon, UsersIcon } from "lucide-react";
import useGame from "../../_game-context/use-game";
import Button from "./_button";
import { getLevelName } from "../../_game-context/_utils";
import { useTranslation } from "react-i18next";

export default function ScoreBoard() {
  const { t } = useTranslation();
  const {
    session,
    currentLevel,
    fiftyFiftyDisabledAnswers,
    phoneAnswer,
    crowdProbabilities,
    expertAnswer,
    handleFiftyFiftyJoker,
    handlePhoneJoker,
    handleCrowdJoker,
    handleExpertJoker,
  } = useGame();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="grid grid-cols-4 gap-1">
        <Button
          onClick={handleFiftyFiftyJoker}
          disabled={fiftyFiftyDisabledAnswers != null}
        >
          <p className="text-white">50:50</p>
        </Button>
        <Button onClick={handlePhoneJoker} disabled={phoneAnswer != null}>
          <PhoneIcon className="text-white" />
        </Button>
        <Button
          onClick={handleCrowdJoker}
          disabled={crowdProbabilities != null}
        >
          <UsersIcon className="text-white" />
        </Button>
        <Button onClick={handleExpertJoker} disabled={expertAnswer != null}>
          <UserIcon className="text-white" />
        </Button>
      </div>
      <div className="hidden lg:flex flex-col gap-1">
        {Array.from({ length: session.length }, (_, i) => {
          const reversedIndex = session.length - i;
          const current = currentLevel === reversedIndex - 1;
          return (
            <p
              key={`stage-${i}`}
              className={`${current && "text-orange-500 font-bold"}`}
            >
              {getLevelName(session.length - i, t)}
            </p>
          );
        })}
      </div>
    </div>
  );
}
