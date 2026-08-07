import z from "zod";
import type {
  zGetLandmarkDetailsResponse,
  zGetLandmarksOverviewResponse,
} from "../../lib/api/public/zod.gen";
import JanneGramDesktop from "./_desktop/desktop";
import JanneGramMobile from "./_mobile/mobile";

export type Landmarks = z.infer<
  typeof zGetLandmarksOverviewResponse.shape.payload
>;
export type Landmark = z.infer<
  typeof zGetLandmarkDetailsResponse.shape.payload
>;
type Props = {
  landmarks: Landmarks;
};

export default function JanneGram({ landmarks }: Props) {
  return (
    <>
      <JanneGramMobile landmarks={landmarks} />
      <JanneGramDesktop landmarks={landmarks} />
    </>
  );
}
