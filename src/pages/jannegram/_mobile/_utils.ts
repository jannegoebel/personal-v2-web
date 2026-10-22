import type { Landmarks } from "../jannegram";

export function getInitialPosition(landmarks: Landmarks) {
  // An empty list has no centre to average, so fall back to (0, 0).
  const length = landmarks.length || 1;

  const longitude =
    landmarks.reduce((acc, mark) => acc + mark.location.longitude, 0) / length;
  const latitude =
    landmarks.reduce((acc, mark) => acc + mark.location.latitude, 0) / length;

  return {
    longitude,
    latitude,
    // Placeholder zoom for the first paint, before `fitBounds` (see
    // getBounds) adjusts it to the map's actual rendered size on load.
    zoom: 2.5,
  };
}

export function getBounds(
  landmarks: Landmarks,
): [[number, number], [number, number]] {
  const longitudes = landmarks.map((l) => l.location.longitude);
  const latitudes = landmarks.map((l) => l.location.latitude);

  return [
    [Math.min(...longitudes), Math.min(...latitudes)],
    [Math.max(...longitudes), Math.max(...latitudes)],
  ];
}
