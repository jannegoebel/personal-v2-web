import { createContext } from "react";
import type { Answer, Question, Session } from "../quiz";

export type GameStage = "intro" | "running" | "result";
export type AnswerWithId = Answer & { id: string };
export type GameQuestion = Omit<Question, "answers"> & {
  answers: AnswerWithId[];
};
export type AnswerProbility = { id: string; probability: number };
type GameProps = {
  /** API LOADING STATES */
  isRestarting: boolean;
  /** LEVEL/QUESTION/STAGE */
  session: Session;
  currentStage: GameStage;
  currentLevel: number;
  currentQuestion: GameQuestion;
  /** JOKERS */
  fiftyFiftyDisabledAnswers: string[] | null;
  phoneAnswer: string | null;
  crowdProbabilities: AnswerProbility[] | null;
  expertAnswer: string | null;
};
type GameActions = {
  /** LEVEL/STAGE INTERACTIONS */
  handleStart: () => void;
  handleAnswer: (answer: AnswerWithId) => void;
  handleRestart: () => void;
  /** JOKER INTERACTIONS */
  handleFiftyFiftyJoker: () => void;
  handlePhoneJoker: () => unknown;
  handleCrowdJoker: () => unknown;
  handleExpertJoker: () => unknown;
};
type GameState = GameProps & GameActions;

export const GameContext = createContext<GameState | null>(null);
