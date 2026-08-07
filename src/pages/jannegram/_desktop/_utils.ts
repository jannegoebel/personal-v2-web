import * as THREE from "three";

export function latLonToVector3(lat: number, lon: number, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function getGlobeRotationToPoint(point: THREE.Vector3, to: THREE.Vector3) {
  const from = point.clone().normalize();
  return new THREE.Quaternion().setFromUnitVectors(from, to.clone().normalize());
}
