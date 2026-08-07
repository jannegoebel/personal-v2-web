import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { type Session } from "../quiz";
import {
  GameContext,
  type AnswerProbility,
  type AnswerWithId,
  type GameQuestion,
  type GameStage,
} from "./game-context";

function createGameQuestion(session: Session, index: number) {
  const question = session[index];
  const shuffledAnswers = question.answers.toSorted(() => Math.random() - 0.5);
  return {
    id: question.id,
    type: question.type,
    question: question.question,
    answers: shuffledAnswers.map((answer) => ({
      ...answer,
      id: crypto.randomUUID(),
    })),
  } satisfies GameQuestion;
}

function getRandomAnswer(answers: AnswerWithId[], biasWeight = 3): string {
  const weightedAnswers = answers.map((answer) => ({
    ...answer,
    weight: answer.correct ? biasWeight : 1,
  }));
  const totalWeight = biasWeight + 3;

  let random = Math.random() * totalWeight;

  for (const answer of weightedAnswers) {
    random -= answer.weight;

    if (random < 0) {
      return answer.id;
    }
  }

  return answers[answers.length - 1].id;
}

function getProbabilities(answers: AnswerWithId[]): AnswerProbility[] {
  const weightedAnswers = answers.map((answer) => ({
    ...answer,
    weight: Math.floor(Math.random() * 8) + 2,
  }));

  const total = weightedAnswers.reduce((sum, answer) => sum + answer.weight, 0);

  return weightedAnswers.map((answer) => ({
    id: answer.id,
    probability: (answer.weight / total) * 100,
  }));
}

type Props = {
  session: Session;
  onRestart: () => Promise<unknown>;
};

export default function GameProvider({
  session,
  onRestart,
  children,
}: PropsWithChildren<Props>) {
  const [isRestarting, setIsRestarting] = useState(false);
  const [currentStage, setCurrentStage] = useState<GameStage>("intro");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion>(
    createGameQuestion(session, 0),
  );
  const [fiftyFiftyDisabledAnswers, setFiftyFiftyDisabledAnswers] = useState<
    string[] | null
  >(null);
  const [phoneAnswer, setPhoneAnswer] = useState<string | null>(null);
  const [crowdProbabilities, setCrowdProbabilities] = useState<
    AnswerProbility[] | null
  >(null);
  const [expertAnswer, setExpertAnswer] = useState<string | null>(null);

  function handleResetJokers() {
    setFiftyFiftyDisabledAnswers(null);
    setPhoneAnswer(null);
    setCrowdProbabilities(null);
    setExpertAnswer(null);
  }

  function handleStart() {
    setCurrentLevel(0);
    setCurrentQuestion(createGameQuestion(session, 0));
    setCurrentStage("running");
  }

  const handleAnswer = useCallback(
    (answer: AnswerWithId) => {
      if (answer.correct && currentLevel < session.length - 1) {
        setCurrentLevel((current) => {
          const newLevel = current + 1;
          setCurrentQuestion(createGameQuestion(session, newLevel));
          return newLevel;
        });
      } else {
        setCurrentStage("result");
      }
    },
    [currentLevel],
  );

  const handleRestart = useCallback(async () => {
    setIsRestarting(true);
    try {
      await onRestart();
      handleResetJokers();
      handleStart();
    } finally {
      setIsRestarting(false);
    }
  }, [onRestart]);

  const handleFiftyFiftyJoker = useCallback(() => {
    const currentAnswers = currentQuestion.answers;
    const disablableAnswers =
      currentQuestion.type === "obligatory"
        ? currentAnswers
        : currentAnswers.filter((answer) => !answer.correct);

    const firstIndex = Math.floor(Math.random() * disablableAnswers.length);
    let secondIndex: number;
    do {
      secondIndex = Math.floor(Math.random() * disablableAnswers.length);
    } while (secondIndex === firstIndex);

    setFiftyFiftyDisabledAnswers([
      disablableAnswers[firstIndex].id,
      disablableAnswers[secondIndex].id,
    ]);
  }, [currentQuestion]);

  const handlePhoneJoker = useCallback(() => {
    setPhoneAnswer(getRandomAnswer(currentQuestion.answers));
  }, [currentQuestion]);

  const handleCrowdJoker = useCallback(() => {
    setCrowdProbabilities(getProbabilities(currentQuestion.answers));
  }, [currentQuestion]);

  const handleExpertJoker = useCallback(() => {
    setExpertAnswer(getRandomAnswer(currentQuestion.answers, 5));
  }, [currentQuestion]);

  const value = useMemo(
    () => ({
      isRestarting,
      session,
      currentStage,
      currentLevel,
      currentQuestion,
      fiftyFiftyDisabledAnswers,
      phoneAnswer,
      crowdProbabilities,
      expertAnswer,
      handleStart,
      handleAnswer,
      handleRestart,
      handleFiftyFiftyJoker,
      handlePhoneJoker,
      handleCrowdJoker,
      handleExpertJoker,
    }),
    [
      isRestarting,
      session,
      currentStage,
      currentLevel,
      currentQuestion,
      fiftyFiftyDisabledAnswers,
      phoneAnswer,
      crowdProbabilities,
      expertAnswer,
      handleStart,
      handleAnswer,
      handleRestart,
      handleFiftyFiftyJoker,
      handlePhoneJoker,
      handleCrowdJoker,
      handleExpertJoker,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
