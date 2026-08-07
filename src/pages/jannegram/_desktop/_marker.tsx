import { useEffect, useRef } from "react";
import * as THREE from "three";
import { latLonToVector3 } from "./_utils";

type Props = {
  selected?: boolean;
  hover?: boolean;
  lat: number;
  lon: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
};

export default function Marker({
  selected = false,
  hover = false,
  lat,
  lon,
  onHoverStart,
  onHoverEnd,
  onClick,
}: Props) {
  const position = latLonToVector3(
    lat,
    lon,
    selected ? 1.04 : hover ? 1.025 : 1.0125,
  );
  const inward = position.clone().normalize().negate();

  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    inward,
  );

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    return () => clearTimeout(hoverTimeoutRef.current);
  }, []);

  function handlePointerEnter() {
    hoverTimeoutRef.current = setTimeout(onHoverStart, 200);
  }

  function handlePointerLeave() {
    clearTimeout(hoverTimeoutRef.current);
    onHoverEnd();
  }

  return (
    <mesh
      position={position}
      quaternion={quaternion}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
    >
      <coneGeometry
        args={
          selected
            ? [0.03, 0.075, 32]
            : hover
              ? [0.02, 0.05, 32]
              : [0.01, 0.025, 32]
        }
      />
      <meshPhysicalMaterial
        color="#ffd6a7"
        emissive={selected ? "#f54900" : hover ? "#ca3500" : "#ff6900"}
        //roughness={0.5}
        metalness={1}
        reflectivity={0.75}
        clearcoat={1}
      />
    </mesh>
  );
}
