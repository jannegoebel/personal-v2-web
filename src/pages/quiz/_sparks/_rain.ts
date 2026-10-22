/**
 * A rain of sparks falling from the top of the page, simulated in pixel space
 * with the origin in the middle of the canvas and y pointing up, which is what
 * an orthographic camera at zoom 1 renders. Nothing in here touches three.js:
 * the rain is a plain simulation that gets written into typed arrays once per
 * frame.
 *
 * The rain is never steady. A slow wind pushes the whole curtain sideways and
 * gusts send denser showers through it, so the screen keeps moving even while
 * the level does not change.
 */

export const MAX_PARTICLES = 3200;

/** Sparks per second at intensity 0 and 1. */
const SPAWN_RATE = [10, 95];
/** Fall speed as a fraction of the canvas height per second. */
const FALL_SPEED = [0.14, 0.3];
/** Share of sparks that are heavy enough to leave a streak behind them. */
const STREAK_SHARE = [0.08, 0.32];
/** Chance that a spark pops into smaller ones as it burns out. */
const CRACKLE_CHANCE = [0, 0.4];
/** Seconds between gusts at intensity 0 and 1. */
const GUST_INTERVAL = [7, 1.8];
/** Sideways push of the wind, in pixels per second squared. */
const WIND_STRENGTH = [12, 46];
/** Gravity as a fraction of the canvas height, so the fall reads the same anywhere. */
const GRAVITY_FACTOR = 0.22;
/** Trail particles per second, per streaking spark. */
const TRAIL_RATE = 52;

export type RainTheme = "dark" | "light";

type Color = readonly [number, number, number];

type RainStyle = {
  /** Opacity multiplier, needed to keep sparks readable on a light page. */
  alphaScale: number;
  colors: readonly Color[];
  /** Colour every spark decays towards while it burns out. */
  ember: Color;
  trail: Color;
};

const STYLES = {
  dark: {
    alphaScale: 1,
    colors: [
      [1, 0.96, 0.86],
      [1, 0.82, 0.42],
      [1, 0.62, 0.16],
      [1, 0.42, 0.08],
    ],
    ember: [1, 0.24, 0.03],
    trail: [1, 0.68, 0.26],
  },
  light: {
    alphaScale: 1.35,
    colors: [
      [1, 0.58, 0],
      [0.96, 0.29, 0],
      [0.85, 0.24, 0],
      [0.7, 0.19, 0],
    ],
    ember: [0.52, 0.13, 0],
    trail: [0.96, 0.4, 0],
  },
} as const satisfies Record<RainTheme, RainStyle>;

type Particle = {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  velocityX: number;
  velocityY: number;
  size: number;
  age: number;
  lifetime: number;
  color: Color;
  alpha: number;
  drag: number;
  gravityScale: number;
  /** How hard the wind pushes this spark around. */
  sail: number;
  /** Sideways speed of the flutter, and where in that swing the spark is. */
  flutter: number;
  wobble: number;
  wobbleSpeed: number;
  /** Twinkle frequency in Hz, 0 for sparks that burn steadily. */
  twinkle: number;
  /** Trail emissions per second, 0 for sparks that leave no streak. */
  trail: number;
  trailBudget: number;
  /** Number of smaller sparks this one pops into when it burns out. */
  crackle: number;
};

export type Rain = {
  particles: Particle[];
  spawnBudget: number;
  /** Seconds until the next gust rolls through. */
  gustTimer: number;
  gustAge: number;
  gustLength: number;
  gustStrength: number;
  /** Where across the width a gust comes down, as a fraction of it. */
  gustCenter: number;
  gustSpread: number;
  time: number;
};

function lerp(from: number, to: number, ratio: number) {
  return from + (to - from) * ratio;
}

function random(from: number, to: number) {
  return from + Math.random() * (to - from);
}

function pick<T>(values: readonly T[]) {
  return values[Math.floor(Math.random() * values.length)];
}

export function createRain(): Rain {
  return {
    particles: [],
    spawnBudget: 0,
    gustTimer: 2,
    gustAge: 0,
    gustLength: 0,
    gustStrength: 0,
    gustCenter: 0,
    gustSpread: 0.3,
    time: 0,
  };
}

function addParticle(rain: Rain, particle: Particle) {
  if (rain.particles.length >= MAX_PARTICLES) return;
  rain.particles.push(particle);
}

function createSpark(
  width: number,
  height: number,
  intensity: number,
  style: RainStyle,
  focus: number | null,
): Particle {
  const streaks =
    Math.random() < lerp(STREAK_SHARE[0], STREAK_SHARE[1], intensity);
  const fall = height * lerp(FALL_SPEED[0], FALL_SPEED[1], intensity);
  const x = focus ?? random(-0.55, 0.55) * width;
  const y = height / 2 + random(0, height * 0.12);

  return {
    x,
    y,
    previousX: x,
    previousY: y,
    velocityX: random(-25, 25),
    velocityY: -fall * random(0.5, 1.4) * (streaks ? 1.5 : 1),
    size:
      (streaks ? random(6, 10) : random(2.2, 4.2)) *
      lerp(0.85, 1.15, intensity),
    age: 0,
    lifetime: random(2.2, 5),
    color: pick(style.colors),
    alpha: streaks ? 1 : random(0.45, 0.85),
    // Enough drag to reach a slow terminal fall instead of plummeting.
    drag: random(0.5, 1.2),
    gravityScale: random(0.3, 0.75),
    sail: random(0.5, 1.6),
    flutter: streaks ? random(5, 20) : random(14, 48),
    wobble: random(0, Math.PI * 2),
    wobbleSpeed: random(0.8, 2.6),
    twinkle: Math.random() < 0.5 ? random(5, 14) : 0,
    trail: streaks ? TRAIL_RATE : 0,
    trailBudget: 0,
    crackle:
      streaks && Math.random() < lerp(CRACKLE_CHANCE[0], CRACKLE_CHANCE[1], intensity)
        ? Math.round(random(4, 10))
        : 0,
  };
}

/**
 * Trails are spread along the path the spark covered this frame, otherwise a
 * fast spark leaves a dotted line instead of a streak.
 */
function emitTrail(
  rain: Rain,
  spark: Particle,
  style: RainStyle,
  ratio: number,
) {
  const x = lerp(spark.previousX, spark.x, ratio);
  const y = lerp(spark.previousY, spark.y, ratio);

  addParticle(rain, {
    x,
    y,
    previousX: x,
    previousY: y,
    velocityX: random(-12, 12),
    velocityY: spark.velocityY * 0.12 + random(-10, 10),
    size: spark.size * random(0.25, 0.45),
    age: 0,
    lifetime: random(0.1, 0.26),
    color: style.trail,
    alpha: random(0.4, 0.8),
    drag: 2.2,
    gravityScale: 0.2,
    sail: 0.3,
    flutter: 0,
    wobble: 0,
    wobbleSpeed: 0,
    twinkle: 0,
    trail: 0,
    trailBudget: 0,
    crackle: 0,
  });
}

/** The little pop a heavy spark makes when it burns out. */
function crackle(rain: Rain, spark: Particle, style: RainStyle) {
  for (let i = 0; i < spark.crackle; i++) {
    const angle = random(0, Math.PI * 2);
    const speed = random(20, 90);

    addParticle(rain, {
      x: spark.x,
      y: spark.y,
      previousX: spark.x,
      previousY: spark.y,
      velocityX: spark.velocityX * 0.3 + Math.cos(angle) * speed,
      velocityY: spark.velocityY * 0.3 + Math.sin(angle) * speed,
      size: random(1.6, 3),
      age: 0,
      lifetime: random(0.3, 0.8),
      color: style.colors[0],
      alpha: random(0.6, 1),
      drag: random(1.4, 2.6),
      gravityScale: 0.9,
      sail: 0.6,
      flutter: random(10, 30),
      wobble: random(0, Math.PI * 2),
      wobbleSpeed: random(2, 5),
      twinkle: random(10, 20),
      trail: 0,
      trailBudget: 0,
      crackle: 0,
    });
  }
}

function updateGust(rain: Rain, delta: number, intensity: number) {
  rain.gustTimer -= delta;

  if (rain.gustTimer <= 0) {
    rain.gustAge = 0;
    rain.gustLength = random(0.7, 2.2);
    rain.gustStrength = random(1.4, 3.4) * lerp(0.6, 1.3, intensity);
    // A gust comes down over one stretch of the page, so the shower reads as a
    // wave sweeping through rather than the whole curtain thickening at once.
    rain.gustCenter = random(-0.42, 0.42);
    rain.gustSpread = random(0.12, 0.3);
    rain.gustTimer =
      lerp(GUST_INTERVAL[0], GUST_INTERVAL[1], intensity) * random(0.6, 1.5);
  }

  if (rain.gustAge >= rain.gustLength) return 1;

  rain.gustAge += delta;

  // Swells and dies away again instead of switching on and off.
  const progress = Math.min(rain.gustAge / rain.gustLength, 1);
  return 1 + (rain.gustStrength - 1) * Math.sin(progress * Math.PI);
}

/** A slow two-wave drift, so the whole curtain leans one way and then the other. */
function getWind(rain: Rain, intensity: number) {
  const direction =
    Math.sin(rain.time * 0.37) * 0.65 + Math.sin(rain.time * 0.13 + 2) * 0.35;

  return direction * lerp(WIND_STRENGTH[0], WIND_STRENGTH[1], intensity);
}

export function updateRain(
  rain: Rain,
  theme: RainTheme,
  delta: number,
  intensity: number,
  width: number,
  height: number,
) {
  if (intensity <= 0 || width <= 0 || height <= 0) return;

  const style = STYLES[theme];
  const gravity = height * GRAVITY_FACTOR;
  const floor = -height / 2 - 40;

  rain.time += delta;

  const gust = updateGust(rain, delta, intensity);
  const wind = getWind(rain, intensity);

  rain.spawnBudget +=
    lerp(SPAWN_RATE[0], SPAWN_RATE[1], intensity) * gust * delta;

  while (rain.spawnBudget >= 1) {
    rain.spawnBudget -= 1;

    // Most of a gust lands inside the gust, the rest keeps falling everywhere.
    const focused = gust > 1.1 && Math.random() < 0.7;
    const focus = focused
      ? (rain.gustCenter + random(-1, 1) * rain.gustSpread) * width
      : null;

    addParticle(rain, createSpark(width, height, intensity, style, focus));
  }

  for (let i = rain.particles.length - 1; i >= 0; i--) {
    const particle = rain.particles[i];

    particle.age += delta;

    if (particle.age >= particle.lifetime || particle.y < floor) {
      if (particle.crackle > 0 && particle.y > floor) {
        crackle(rain, particle, style);
      }

      rain.particles[i] = rain.particles[rain.particles.length - 1];
      rain.particles.pop();
      continue;
    }

    particle.previousX = particle.x;
    particle.previousY = particle.y;

    const drag = Math.max(1 - particle.drag * delta, 0);
    particle.wobble += particle.wobbleSpeed * delta;
    particle.velocityX =
      particle.velocityX * drag + wind * particle.sail * delta;
    particle.velocityY =
      particle.velocityY * drag - gravity * particle.gravityScale * delta;
    // The flutter is a sideways swing rather than a force, so a spark keeps
    // drifting the way an ember does instead of building up speed.
    particle.x +=
      (particle.velocityX + Math.sin(particle.wobble) * particle.flutter) *
      delta;
    particle.y += particle.velocityY * delta;

    if (particle.trail === 0) continue;

    particle.trailBudget += particle.trail * delta;
    const trails = Math.floor(particle.trailBudget);
    particle.trailBudget -= trails;

    for (let trail = 0; trail < trails; trail++) {
      emitTrail(rain, particle, style, (trail + 1) / trails);
    }
  }
}

export type RainBuffers = {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  alphas: Float32Array;
};

export function createBuffers(): RainBuffers {
  return {
    positions: new Float32Array(MAX_PARTICLES * 3),
    colors: new Float32Array(MAX_PARTICLES * 3),
    sizes: new Float32Array(MAX_PARTICLES),
    alphas: new Float32Array(MAX_PARTICLES),
  };
}

/** Writes the live sparks into the buffers and returns how many there are. */
export function writeRain(
  rain: Rain,
  theme: RainTheme,
  buffers: RainBuffers,
): number {
  const style = STYLES[theme];
  const { positions, colors, sizes, alphas } = buffers;

  let count = 0;

  for (const particle of rain.particles) {
    const progress = particle.age / particle.lifetime;
    // Snap alight, then burn out over the rest of the lifetime.
    const fade =
      progress < 0.08 ? progress / 0.08 : ((1 - progress) / 0.92) ** 0.65;
    const twinkle =
      particle.twinkle === 0
        ? 1
        : 0.4 +
          0.6 * Math.abs(Math.sin(rain.time * particle.twinkle + particle.x));
    const alpha = Math.min(
      Math.max(fade, 0) * twinkle * particle.alpha * style.alphaScale,
      1,
    );

    if (alpha <= 0.004) continue;

    // Sparks cool down towards ember red as they fall.
    const cool = progress * 0.5;
    const index = count * 3;

    positions[index] = particle.x;
    positions[index + 1] = particle.y;
    positions[index + 2] = 0;

    colors[index] = lerp(particle.color[0], style.ember[0], cool);
    colors[index + 1] = lerp(particle.color[1], style.ember[1], cool);
    colors[index + 2] = lerp(particle.color[2], style.ember[2], cool);

    sizes[count] = particle.size;
    alphas[count] = alpha;

    count++;
  }

  return count;
}
