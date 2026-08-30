import { useRef, useState } from "react";
import * as THREE from "three";
import type { Landmark, Landmarks } from "../jannegram";
import Earth from "./_earth";
import Marker from "./_marker";

type Props = {
  landmarks: Landmarks;
  markerHover: string | null;
  onMarkerHover: (id: string | null) => void;
  onMarkerClick: (landmark: Landmark) => void;
};

export default function EarthGroup({
  landmarks,
  markerHover,
  onMarkerHover,
  onMarkerClick,
}: Props) {
  const earthGroupRef = useRef<THREE.Group>(null);

  const [selected, setSelected] = useState<string>();

  function handleHoverStart(landmark: Landmark) {
    onMarkerHover(landmark.id);
  }

  function handleHoverEnd() {
    onMarkerHover(null);
  }

  function handleMarkerClick(landmark: Landmark) {
    setSelected(landmark.id);
    onMarkerClick(landmark);
  }

  return (
    <group ref={earthGroupRef}>
      <Earth />
      {landmarks.map((landmark) => (
        <Marker
          key={landmark.id}
          selected={selected === landmark.id}
          hover={markerHover === landmark.id}
          lat={landmark.location.latitude}
          lon={landmark.location.longitude}
          onHoverStart={() => handleHoverStart(landmark)}
          onHoverEnd={handleHoverEnd}
          onClick={() => handleMarkerClick(landmark)}
        />
      ))}
    </group>
  );
}
