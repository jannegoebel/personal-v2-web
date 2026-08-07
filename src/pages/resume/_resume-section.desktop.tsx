import { getPosition } from "./_utils";
import type { ResumeEntryType } from "./resume";

type Props = {
  align: "top" | "bottom";
  selected?: boolean;
  startDate: Date;
  entry: ResumeEntryType;
  onClick: () => void;
};

export default function ResumeSectionDesktop({
  align,
  selected,
  startDate,
  entry,
  onClick,
}: Props) {
  const entryStart = new Date(entry.startAt);
  const entryEnd = entry.endAt ? new Date(entry.endAt) : new Date();
  const start = getPosition(startDate, entryStart) * 100;
  const width =
    (getPosition(startDate, entryEnd) - getPosition(startDate, entryStart)) *
    100;

  return (
    <span
      className={`cursor-pointer absolute ${align === "top" ? "top-0" : "bottom-0"} border-l border-r h-4 ${selected ? "bg-orange-500" : "bg-orange-500/25 hover:bg-orange-500/50"} `}
      style={{
        left: `${start}%`,
        width: `${width}%`,
      }}
      onClick={onClick}
    />
  );
}
