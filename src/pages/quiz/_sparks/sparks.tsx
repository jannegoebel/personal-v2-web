import { Suspense, lazy } from "react";
import { useTheme } from "../../../lib/contexts/theme-context/use-theme";
import { useReducedMotion } from "../../../lib/hooks/use-reduced-motion";
import { getRainIntensity } from "./_utils";

// The curtain carries three.js with it, so the download only happens for the
// players who actually get this far.
const Curtain = lazy(() => import("./_curtain"));

type Props = {
  level: number;
  maxLevel: number;
};

export default function Sparks({ level, maxLevel }: Props) {
  const { isDark } = useTheme();
  const reducedMotion = useReducedMotion();

  const intensity = getRainIntensity(level, maxLevel);

  if (reducedMotion || intensity <= 0) return null;

  return (
    <Suspense fallback={null}>
      <Curtain intensity={intensity} theme={isDark ? "dark" : "light"} />
    </Suspense>
  );
}
