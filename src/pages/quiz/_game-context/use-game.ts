import { useContext } from "react";
import { GameContext } from "./game-context";

export default function useGame() {
  const ctx = useContext(GameContext);

  if (ctx == null) {
    throw new Error("useGame must be used within <GameProvider />");
  }

  return ctx;
}
