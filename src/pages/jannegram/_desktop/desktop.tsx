import { Suspense, useState } from "react";
import BlankPage from "../../../lib/components/pages/blank-page/blank-page";
import type { Landmarks, Landmark as LandmarkType } from "../jannegram";
import Canvas from "./_canvas";
import Landmark from "./_landmark";

type Props = {
  landmarks: Landmarks;
};

export default function JanneGramDesktop({ landmarks }: Props) {
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkType>();

  return (
    <BlankPage className="hidden md:grid grid-rows-[1.5fr_1fr] overflow-hidden p-0 md:p-0">
      <div className="w-full grid items-center overflow-hidden px-2">
        {selectedLandmark && (
          <Landmark
            key={`landmark-${selectedLandmark.id}`}
            landmark={selectedLandmark}
          />
        )}
      </div>
      <div className="h-[250%] overflow-hidden">
        <Suspense>
          <Canvas landmarks={landmarks} onSelectMarker={setSelectedLandmark} />
        </Suspense>
      </div>
    </BlankPage>
  );
}
