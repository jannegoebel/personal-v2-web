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

/**
 * Camera distance at which the globe's silhouette rises `domeHeight` times the canvas
 * height above the canvas' bottom edge.
 *
 * Assumes a bottom anchored camera (see `BottomAnchor` in `_canvas.tsx`): the globe's
 * centre sits on the bottom edge, so the visible dome is exactly the silhouette's radius.
 */
export function getCameraDistance(
  domeHeight: number,
  fov: number,
  radius = 1,
): number {
  const halfFov = THREE.MathUtils.degToRad(fov) / 2;
  const silhouetteAngle = Math.atan(2 * domeHeight * Math.tan(halfFov));

  return radius / Math.sin(silhouetteAngle);
}

export function getCenterCameraPosition(
  landmarks: Landmarks,
  distance: number,
  yOffset = 0.4,
): THREE.Vector3 {
  // An empty list has no centre to average, so fall back to (0, 0).
  const length = landmarks.length || 1;

  const latitude =
    landmarks.reduce((acc, mark) => acc + mark.location.latitude, 0) / length;
  const longitude =
    landmarks.reduce((acc, mark) => acc + mark.location.longitude, 0) / length;

  const centerPoint = latLonToVector3(latitude, longitude);

  // The offset tilts the camera below the landmarks' centre, which lifts them off the
  // bottom edge and into the visible dome.
  return new THREE.Vector3(centerPoint.x, centerPoint.y - yOffset, centerPoint.z)
    .normalize()
    .multiplyScalar(distance);
}
