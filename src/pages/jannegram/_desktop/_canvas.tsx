import { OrbitControls } from "@react-three/drei";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import type { Landmark, Landmarks } from "../jannegram";
import EarthGroup from "./_earth-group";
import { getCenterCameraPosition } from "./_utils";
import { useState } from "react";

type Props = {
  landmarks: Landmarks;
  onSelectMarker: (landmark: Landmark) => void;
};
type SceneProps = Props & {
  hoverMarker: string | null;
  onHoverMarker: (id: string | null) => void;
};

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

      <EarthGroup
        landmarks={landmarks}
        markerHover={hoverMarker}
        onMarkerHover={onHoverMarker}
        onMarkerClick={(landmark) => onSelectMarker(landmark)}
      />

      <OrbitControls
        minDistance={Math.sqrt(3)}
        maxDistance={Math.sqrt(3)}
        enablePan={false}
      />
    </>
  );
}

export default function Canvas({ landmarks, onSelectMarker }: Props) {
  const position = getCenterCameraPosition(landmarks);

  const [grabbing, setGrabbing] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <span
      className={`${hover != null ? "cursor-pointer" : grabbing ? "cursor-grabbing" : "cursor-grab"}`}
      onPointerDown={() => setGrabbing(true)}
      onPointerUp={() => setGrabbing(false)}
      onPointerLeave={() => setGrabbing(false)}
    >
      <ThreeCanvas camera={{ position }}>
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
