import { useState } from "react";
import z from "zod";
import type { zGetTimelineOverviewResponse } from "../../lib/api/public/zod.gen";
import ResumeEntryDesktop from "./_resume-entry.desktop";
import ResumeSectionDesktop from "./_resume-section.desktop";
import BlankPage from "../../lib/components/pages/blank-page/blank-page";
import ResumeEntryMobile from "./_resume-entry.mobile";
import ResumeSectionMobile from "./_resume-section.mobile";

type Resume = z.infer<typeof zGetTimelineOverviewResponse.shape.payload>;
export type ResumeEntryType = Resume[number];

type Props = {
  resume: Resume;
};

export default function ResumeOverview({ resume }: Props) {
  const firstEntry = resume
    .toSorted((a, b) => a.startAt.localeCompare(b.startAt))
    .at(0);
  const startDate = new Date(firstEntry?.startAt ?? "1999-12-30");

  const professionalEntries = resume.filter(
    (r) => r.type === "education" || r.type === "profession",
  );
  const latestProfessionalEntry = professionalEntries
    .toSorted((a, b) => b.startAt.localeCompare(a.startAt))
    .at(0);
  const [displayProfessional, setDisplayProfessional] = useState<
    ResumeEntryType | undefined
  >(latestProfessionalEntry);

  const hobbyEntries = resume.filter((r) => r.type === "hobby");
  const latestHobbyEntry = hobbyEntries
    .toSorted((a, b) => b.startAt.localeCompare(a.startAt))
    .at(0);
  const [displayHobby, setDisplayHobby] = useState<ResumeEntryType | undefined>(
    latestHobbyEntry,
  );

  return (
    <BlankPage className="p-2">
      <div className="grid h-full md:hidden grid-cols-[3rem_1fr_3rem] gap-2 overflow-hidden">
        <div className="relative border-px border-l">
          {professionalEntries.map((entry) => (
            <ResumeSectionMobile
              key={entry.id}
              align="left"
              selected={displayProfessional?.id === entry.id}
              startDate={startDate}
              entry={entry}
              onClick={() => setDisplayProfessional(entry)}
            />
          ))}
        </div>
        <div className="grid grid-rows-2">
          {displayProfessional && (
            <ResumeEntryMobile
              key={`display-professional-${displayProfessional.id}`}
              entry={displayProfessional}
            />
          )}
          {displayHobby && (
            <ResumeEntryMobile
              key={`display-hobby-${displayHobby.id}`}
              entry={displayHobby}
            />
          )}
        </div>
        <div className="relative border-px border-r">
          {hobbyEntries.map((entry) => (
            <ResumeSectionMobile
              key={entry.id}
              align="right"
              selected={displayHobby?.id === entry.id}
              startDate={startDate}
              entry={entry}
              onClick={() => setDisplayHobby(entry)}
            />
          ))}
        </div>
      </div>
      <div className="hidden h-full md:grid grid-rows-[1fr_auto_1fr] p-8">
        <div className="relative">
          {displayProfessional && (
            <ResumeEntryDesktop
              key={`display-professional-${displayProfessional.id}`}
              align="top"
              entry={displayProfessional}
            />
          )}
          {professionalEntries.map((entry) => (
            <ResumeSectionDesktop
              key={entry.id}
              align="bottom"
              selected={displayProfessional?.id === entry.id}
              startDate={startDate}
              entry={entry}
              onClick={() => setDisplayProfessional(entry)}
            />
          ))}
        </div>
        <span className="h-1 bg-black dark:bg-white" />
        <div className="relative">
          {hobbyEntries.map((entry) => (
            <ResumeSectionDesktop
              key={entry.id}
              align="top"
              selected={displayHobby?.id === entry.id}
              startDate={startDate}
              entry={entry}
              onClick={() => setDisplayHobby(entry)}
            />
          ))}
          {displayHobby && (
            <ResumeEntryDesktop
              key={`display-hobby-${displayHobby.id}`}
              align="bottom"
              entry={displayHobby}
            />
          )}
        </div>
      </div>
    </BlankPage>
  );
}
