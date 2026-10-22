import { useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { Marker, Map as RMap, type MapRef } from "react-map-gl/maplibre";
import SimpleMarkerIcon from "../../../lib/components/icons/simple-marker";
import type { Landmark, Landmarks } from "../jannegram";
import MapControl from "./_map-control";
import { getBounds, getInitialPosition } from "./_utils";
import style from "./_map.module.css";
import { useTheme } from "../../../lib/contexts/theme-context/use-theme";

type Props = {
  landmarks: Landmarks;
  selectedLandmark?: Landmark;
  onSelectLandmark: (landmark: Landmark) => void;
};

export default function Map({
  landmarks,
  selectedLandmark,
  onSelectLandmark,
}: Props) {
  const mapRef = useRef<MapRef>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const { longitude, latitude, zoom } = getInitialPosition(landmarks);

  function handleMarkerClick(landmark: Landmark) {
    onSelectLandmark(landmark);
    if (mapRef.current == null) return;
    mapRef.current.flyTo({
      center: [landmark.location.longitude, landmark.location.latitude],
      zoom: 15,
    });
  }

  function handleMapLoad() {
    if (mapRef.current == null || landmarks.length === 0) return;

    mapRef.current.fitBounds(getBounds(landmarks), {
      padding: 40,
      maxZoom: 15,
      duration: 0,
    });
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${style.map}`}>
      <RMap
        ref={mapRef}
        initialViewState={{
          latitude,
          longitude,
          zoom,
        }}
        mapStyle={
          isLight
            ? "https://tiles.openfreemap.org/styles/positron"
            : "https://tiles.openfreemap.org/styles/dark"
        }
        onLoad={handleMapLoad}
      >
        {landmarks.map((landmark) => (
          <Marker
            key={landmark.id}
            longitude={landmark.location.longitude}
            latitude={landmark.location.latitude}
            anchor="bottom"
            onClick={() => handleMarkerClick(landmark)}
          >
            <SimpleMarkerIcon
              className={
                selectedLandmark?.id === landmark.id
                  ? "text-orange-600"
                  : "text-orange-500"
              }
              size={32}
            />
          </Marker>
        ))}
        <MapControl className="absolute bottom-0 left-0 right-0" />
      </RMap>
    </div>
  );
}
