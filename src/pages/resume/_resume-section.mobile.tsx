import { getPosition } from "./_utils";
import type { ResumeEntryType } from "./resume";

type Props = {
  align: "left" | "right";
  selected?: boolean;
  startDate: Date;
  entry: ResumeEntryType;
  onClick: () => void;
};

export default function ResumeSectionMobile({
  align,
  selected,
  startDate,
  entry,
  onClick,
}: Props) {
  const entryStart = new Date(entry.startAt);
  const entryEnd = entry.endAt ? new Date(entry.endAt) : new Date();
  const start = getPosition(startDate, entryStart) * 100;
  const height =
    (getPosition(startDate, entryEnd) - getPosition(startDate, entryStart)) *
    100;

  return (
    <span
      className={`cursor-pointer absolute ${align === "left" ? "left-0" : "right-0"} border-t border-b w-full ${selected ? "bg-orange-500" : "bg-orange-500/25 hover:bg-orange-500/50"} `}
      style={{
        top: `${start}%`,
        height: `${height}%`,
      }}
      onClick={onClick}
    />
  );
}
