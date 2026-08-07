import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import Earth from "./_earth";
import type { Landmark, Landmarks } from "../jannegram";
import Marker from "./_marker";

type Props = {
  landmarks: Landmarks;
  stopAutoRotation: boolean;
  onStopAutoRotation: () => void;
  onStartAutoRotation: () => void;
  onMarkerClick: (landmark: Landmark) => void;
};

export default function EarthGroup({
  landmarks,
  stopAutoRotation,
  onStopAutoRotation,
  onStartAutoRotation,
  onMarkerClick,
}: Props) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const [selected, setSelected] = useState<string>();
  const [hover, setHover] = useState<string | null>(null);

  function handleHoverStart(landmark: Landmark) {
    setHover(landmark.id);
    onStopAutoRotation();
  }
  function handleHoverEnd() {
    setHover(null);
    onStartAutoRotation();
  }
  function handleMarkerClick(landmark: Landmark) {
    setSelected(landmark.id);
    onStopAutoRotation();
    onMarkerClick(landmark);
  }

  useFrame(() => {
    if (earthGroupRef.current == null) return;

    if (!stopAutoRotation) {
      earthGroupRef.current.rotation.x += 0.0025;
    }
  });

  return (
    <group ref={earthGroupRef}>
      <Earth />
      {landmarks.map((landmark) => {
        const lat = landmark.location.latitude;
        const lon = landmark.location.longitude;

        return (
          <Marker
            key={landmark.id}
            selected={selected === landmark.id}
            hover={hover === landmark.id}
            lat={lat}
            lon={lon}
            onHoverStart={() => handleHoverStart(landmark)}
            onHoverEnd={handleHoverEnd}
            onClick={() => handleMarkerClick(landmark)}
          />
        );
      })}
    </group>
  );
}
