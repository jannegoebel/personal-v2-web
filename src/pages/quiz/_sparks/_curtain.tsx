import { Canvas as ThreeCanvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  createBuffers,
  createRain,
  updateRain,
  writeRain,
  type RainTheme,
} from "./_rain";

/** How fast the rain catches up with the intensity of a new level. */
const RAMP_SPEED = 0.9;
const MAX_DELTA = 0.05;

const VERTEX_SHADER = /* glsl */ `
  uniform float uPixelRatio;

  attribute vec3 aColor;
  attribute float aSize;
  attribute float aAlpha;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float distance = length(gl_PointCoord - 0.5);
    if (distance > 0.5) discard;

    // A bright core wrapped in a soft halo.
    float halo = pow(1.0 - distance * 2.0, 1.5);
    float core = smoothstep(0.3, 0.0, distance);

    gl_FragColor = vec4(vColor, vAlpha * clamp(halo * 0.9 + core, 0.0, 1.0));
  }
`;

type SceneProps = {
  intensity: number;
  theme: RainTheme;
};

function Scene({ intensity, theme }: SceneProps) {
  const size = useThree((state) => state.size);
  const pixelRatio = useThree((state) => state.viewport.dpr);

  const rain = useMemo(() => createRain(), []);
  const currentIntensity = useRef(0);

  const buffers = useMemo(() => createBuffers(), []);
  const { geometry, attributes } = useMemo(() => {
    const instance = new THREE.BufferGeometry();
    const specs = [
      ["position", buffers.positions, 3],
      ["aColor", buffers.colors, 3],
      ["aSize", buffers.sizes, 1],
      ["aAlpha", buffers.alphas, 1],
    ] as const;

    const created = specs.map(([name, array, itemSize]) => {
      const attribute = new THREE.BufferAttribute(array, itemSize);
      attribute.setUsage(THREE.DynamicDrawUsage);
      instance.setAttribute(name, attribute);
      return attribute;
    });

    instance.setDrawRange(0, 0);
    return { geometry: instance, attributes: created };
  }, [buffers]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uPixelRatio: { value: 1 } },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      }),
    [],
  );

  useEffect(() => {
    // Sparks glow additively against a dark page; on a light one that would
    // bleach them away, so there they are painted normally instead.
    material.blending =
      theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending;
    material.needsUpdate = true;
  }, [material, theme]);

  useEffect(() => {
    material.uniforms.uPixelRatio.value = pixelRatio;
  }, [material, pixelRatio]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((_, delta) => {
    // A tab that was in the background hands us one huge delta on its way back.
    const step = Math.min(delta, MAX_DELTA);

    currentIntensity.current +=
      (intensity - currentIntensity.current) * Math.min(step * RAMP_SPEED, 1);

    updateRain(
      rain,
      theme,
      step,
      currentIntensity.current,
      size.width,
      size.height,
    );

    const count = writeRain(rain, theme, buffers);
    geometry.setDrawRange(0, count);

    // Only the live sparks sit at the front of the buffers, so the rest of
    // each array does not need to travel to the GPU every frame.
    for (const attribute of attributes) {
      attribute.addUpdateRange(0, count * attribute.itemSize);
      attribute.needsUpdate = true;
    }
  });

  return (
    <points geometry={geometry} material={material} frustumCulled={false} />
  );
}

type Props = {
  intensity: number;
  theme: RainTheme;
};

/**
 * Pulls in three.js, so it is only ever imported once a player is deep enough
 * into the quiz to see the sparks.
 */
export default function Curtain({ intensity, theme }: Props) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
      <ThreeCanvas
        orthographic
        camera={{ position: [0, 0, 100], zoom: 1, near: 0.1, far: 1000 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 2]}
      >
        <Scene intensity={intensity} theme={theme} />
      </ThreeCanvas>
    </div>
  );
}
