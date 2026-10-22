import { CircleSmallIcon, PhoneIcon, UserIcon } from "lucide-react";
import { useLanguage } from "../../../../lib/hooks/use-language";
import type { AnswerWithId } from "../../_game-context/game-context";
import useGame from "../../_game-context/use-game";

type Props = {
  prefix: string;
  answer: AnswerWithId;
  selected?: string;
  showResult?: boolean;
  onSelected: () => void;
  onShowResult: () => void;
};

export default function Button({
  prefix,
  answer,
  selected,
  showResult,
  onSelected,
  onShowResult,
}: Props) {
  const { language } = useLanguage();
  const {
    fiftyFiftyDisabledAnswers,
    phoneAnswer,
    crowdProbabilities,
    expertAnswer,
    handleAnswer,
  } = useGame();

  function handleClick() {
    onSelected();
    setTimeout(() => {
      onShowResult();
      setTimeout(() => handleAnswer(answer), 2000);
    }, 3000);
  }

  const resolvedLanguage = language === "de" ? "german" : "english";
  const isSelected = selected === answer.id;
  const isCorrect = showResult && answer.correct;
  const isFalse = isSelected && showResult && !answer.correct;
  function getBackgroundColor() {
    if (isCorrect) {
      return "bg-green-500 border-green-300 animate-pulse";
    } else if (isFalse) {
      return "bg-red-500 border-red-300";
    } else if (isSelected) {
      return "bg-orange-300 border-orange-400 animate-pulse";
    } else {
      return "bg-blue-600 border-blue-400 hover:bg-orange-500 hover:border-orange-300 disabled:cursor-default disabled:bg-neutral-500 disabled:border-neutral-300 disabled:hover:bg-neutral-500 disabled:hover:border-neutral-300";
    }
  }

  const probability = crowdProbabilities?.find(
    (p) => p.id === answer.id,
  )?.probability;
  const isPhoneAnswer = phoneAnswer === answer.id;
  const isExpertAnswer = expertAnswer === answer.id;

  return (
    <button
      className={`group cursor-pointer w-full h-full grid grid-cols-[auto_auto_1fr_auto] items-center text-start p-2 md:p-1 border-2 ${getBackgroundColor()}`}
      onClick={handleClick}
      disabled={fiftyFiftyDisabledAnswers?.includes(answer.id)}
    >
      <b
        className={`text-sm md:text-md ${isSelected || isFalse || isCorrect ? "text-black" : "text-white"}`}
      >
        {prefix}
      </b>
      <CircleSmallIcon
        className={`w-1 h-1 md:w-2 md:h-2 ${isSelected || isFalse || isCorrect ? "fill-black text-black" : "fill-white text-white"} my-2 mx-1.5`}
      />
      <p
        className={`text-sm md:text-md ${isSelected || isFalse || isCorrect ? "text-black font-bold" : "text-white"} group-hover:font-bold group-disabled:group-hover:font-normal`}
      >
        {answer.answer[resolvedLanguage]}
      </p>
      <div className="flex flex-row items-center font-medium gap-0.5">
        {isPhoneAnswer && (
          <PhoneIcon
            className={`size-4 md:size-5 ${isSelected || isFalse || isCorrect ? "text-black" : "text-white"}`}
          />
        )}
        {isExpertAnswer && (
          <>
            {isPhoneAnswer && (
              <CircleSmallIcon
                className={`size-1 ${isSelected || isFalse || isCorrect ? "fill-black text-black" : "fill-white text-white"} my-2 mx-1.5`}
              />
            )}
            <UserIcon
              className={`size-4 md:size-5 ${isSelected || isFalse || isCorrect ? "text-black" : "text-white"}`}
            />
          </>
        )}
        {probability != null && (
          <>
            {(isPhoneAnswer || isExpertAnswer) && (
              <CircleSmallIcon
                className={`size-1 ${isSelected || isFalse || isCorrect ? "fill-black text-black" : "fill-white text-white"} my-2 mx-1.5`}
              />
            )}
            <p
              className={`text-sm ${isSelected || isFalse || isCorrect ? "text-black" : "text-white"}`}
            >{`${probability.toFixed(2)}%`}</p>
          </>
        )}
      </div>
    </button>
  );
}
