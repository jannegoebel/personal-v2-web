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
    <BlankPage className="relative hidden md:block overflow-hidden p-0 md:p-0">
      <div className="absolute inset-x-0 top-0 grid items-center overflow-hidden px-2">
        {selectedLandmark && (
          <Landmark
            key={`landmark-${selectedLandmark.id}`}
            landmark={selectedLandmark}
          />
        )}
      </div>
      <div className="absolute inset-0">
        <Suspense>
          <Canvas landmarks={landmarks} onSelectMarker={setSelectedLandmark} />
        </Suspense>
      </div>
    </BlankPage>
  );
}
