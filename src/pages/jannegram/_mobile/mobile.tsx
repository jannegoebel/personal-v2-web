import { useState } from "react";
import BlankPage from "../../../lib/components/pages/blank-page/blank-page";
import type { Landmark as LandmarkType, Landmarks } from "../jannegram";
import Map from "./_map";
import Landmark from "./_landmark";

type Props = {
  landmarks: Landmarks;
};

export default function JanneGramMobile({ landmarks }: Props) {
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkType>();
  return (
    <BlankPage className="w-full h-full grid grid-rows-2 md:hidden place-items-center gap-2 p-0">
      <div className="w-full h-full">
        {selectedLandmark && (
          <Landmark key={selectedLandmark.id} landmark={selectedLandmark} />
        )}
      </div>
      <Map
        landmarks={landmarks}
        selectedLandmark={selectedLandmark}
        onSelectLandmark={(landmark) => setSelectedLandmark(landmark)}
      />
    </BlankPage>
  );
}
