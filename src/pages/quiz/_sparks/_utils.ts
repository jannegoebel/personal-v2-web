/** First level that gets a rain of sparks. */
export const SPARKS_START_LEVEL = 10;

/**
 * Rain intensity for a level: a thin drizzle of embers on the first hot level,
 * a downpour on the last one. Returns 0 below the threshold.
 */
export function getRainIntensity(level: number, maxLevel: number) {
  if (level < SPARKS_START_LEVEL) return 0;

  const steps = Math.max(maxLevel - SPARKS_START_LEVEL, 1);
  const progress = Math.min((level - SPARKS_START_LEVEL) / steps, 1);

  return 0.2 + 0.8 * progress;
}
