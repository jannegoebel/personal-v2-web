import { OrbitControls } from "@react-three/drei";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { useState } from "react";
import EarthGroup from "./_earth-group";
import type { Landmark, Landmarks } from "../jannegram";

type Props = {
  landmarks: Landmarks;
  onSelectMarker: (landmark: Landmark) => void;
};

function Scene({ landmarks, onSelectMarker }: Props) {
  const [stopAutoRotation, setStopAutoRotation] = useState(false);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} />

      <EarthGroup
        landmarks={landmarks}
        stopAutoRotation={stopAutoRotation}
        onStopAutoRotation={() => setStopAutoRotation(true)}
        onStartAutoRotation={() => setStopAutoRotation(true)}
        onMarkerClick={(landmark) => onSelectMarker(landmark)}
      />

      <OrbitControls
        minDistance={Math.sqrt(3)}
        maxDistance={Math.sqrt(3)}
        enablePan={false}
        onStart={() => setStopAutoRotation(true)}
      />
    </>
  );
}

export default function Canvas({ landmarks, onSelectMarker }: Props) {
  return (
    <ThreeCanvas camera={{ position: [1, 1, 1] }}>
      <Scene landmarks={landmarks} onSelectMarker={onSelectMarker} />
    </ThreeCanvas>
  );
}
