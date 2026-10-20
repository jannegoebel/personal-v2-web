import { OrbitControls } from "@react-three/drei";
import { Canvas as ThreeCanvas, useThree } from "@react-three/fiber";
import { useLayoutEffect, useState } from "react";
import * as THREE from "three";
import type { Landmark, Landmarks } from "../jannegram";
import EarthGroup from "./_earth-group";
import { getCameraDistance, getCenterCameraPosition } from "./_utils";

const FOV = 50;

/** How far the globe rises up the canvas, as a fraction of the canvas height. */
const DOME_HEIGHT_DEFAULT = 0.5;
const DOME_HEIGHT_MAX = 1;

// A taller dome needs a closer camera, so the default framing is the far end of the range.
const MAX_DISTANCE = getCameraDistance(DOME_HEIGHT_DEFAULT, FOV);
const MIN_DISTANCE = getCameraDistance(DOME_HEIGHT_MAX, FOV);

type Props = {
  landmarks: Landmarks;
  onSelectMarker: (landmark: Landmark) => void;
};
type SceneProps = Props & {
  hoverMarker: string | null;
  onHoverMarker: (id: string | null) => void;
};

/**
 * Shifts the rendered frustum down by half a canvas, which pins the globe's centre to the
 * bottom edge. Only the top of the globe is ever in view, and zooming grows the dome
 * upwards instead of around the middle of the canvas.
 */
function BottomAnchor() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  useLayoutEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    camera.setViewOffset(
      size.width,
      size.height,
      0,
      -size.height / 2,
      size.width,
      size.height,
    );

    return () => camera.clearViewOffset();
  }, [camera, size.width, size.height]);

  return null;
}

function Scene({
  landmarks,
  hoverMarker,
  onHoverMarker,
  onSelectMarker,
}: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} />

      <BottomAnchor />

      <EarthGroup
        landmarks={landmarks}
        markerHover={hoverMarker}
        onMarkerHover={onHoverMarker}
        onMarkerClick={(landmark) => onSelectMarker(landmark)}
      />

      <OrbitControls
        minDistance={MIN_DISTANCE}
        maxDistance={MAX_DISTANCE}
        enablePan={false}
      />
    </>
  );
}

export default function Canvas({ landmarks, onSelectMarker }: Props) {
  const position = getCenterCameraPosition(landmarks, MAX_DISTANCE);

  const [grabbing, setGrabbing] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <span
      className={`block w-full h-full ${hover != null ? "cursor-pointer" : grabbing ? "cursor-grabbing" : "cursor-grab"}`}
      onPointerDown={() => setGrabbing(true)}
      onPointerUp={() => setGrabbing(false)}
      onPointerLeave={() => setGrabbing(false)}
    >
      <ThreeCanvas camera={{ position, fov: FOV, near: 0.1, far: 10 }}>
        <Scene
          landmarks={landmarks}
          hoverMarker={hover}
          onHoverMarker={(id) => setHover(id)}
          onSelectMarker={onSelectMarker}
        />
      </ThreeCanvas>
    </span>
  );
}
