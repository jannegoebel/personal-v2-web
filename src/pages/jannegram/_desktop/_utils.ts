import * as THREE from "three";
import type { Landmarks } from "../jannegram";

export function latLonToVector3(lat: number, lon: number, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function getCenterCameraPosition(
  landmarks: Landmarks,
  yOffset = 0.4,
): THREE.Vector3 {
  const length = landmarks.length;

  const latitude =
    landmarks.reduce((acc, mark) => acc + mark.location.latitude, 0) / length;
  const longitude =
    landmarks.reduce((acc, mark) => acc + mark.location.longitude, 0) / length;

  const centerPoint = latLonToVector3(latitude, longitude);

  return new THREE.Vector3(
    centerPoint.x,
    centerPoint.y - yOffset,
    centerPoint.z,
  );
}
