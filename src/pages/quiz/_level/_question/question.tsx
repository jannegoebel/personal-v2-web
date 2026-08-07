import { useState } from "react";
import { useLanguage } from "../../../../lib/hooks/use-language";
import type { GameQuestion } from "../../_game-context/game-context";
import Button from "./_button";

function numberToLetter(num: number) {
  return String.fromCharCode(64 + num);
}

type Props = {
  question: GameQuestion;
};

export default function Question({ question }: Readonly<Props>) {
  const { language } = useLanguage();

  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [showResult, setShowResult] = useState(false);

  const resolvedLanguage = language === "de" ? "german" : "english";

  return (
    <div className="flex flex-col w-full md:grid grid-cols-2 auto-rows-auto gap-x-4 gap-y-2">
      <div className="col-span-full bg-blue-600 px-2 py-2 md:px-1 md:py-2 border-2 border-blue-400">
        <p className="text-sm md:text-md font-medium text-white">
          {question.question[resolvedLanguage]}
        </p>
      </div>
      {question.answers.map((answer, index) => (
        <Button
          key={answer.id}
          prefix={numberToLetter(index + 1)}
          answer={answer}
          selected={selectedAnswer}
          showResult={showResult}
          onSelected={() => setSelectedAnswer(answer.id)}
          onShowResult={() => setShowResult(true)}
        />
      ))}
    </div>
  );
}
