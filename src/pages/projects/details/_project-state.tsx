import { useTranslation } from "react-i18next";
import type { Project } from "./details";

type Props = {
  state: Project["state"];
  link?: string;
};

function StateIndicator({ state }: Props) {
  switch (state) {
    case "deprecated":
      return <span className="h-3 w-3 rounded-lg bg-neutral-500" />;
    case "planning":
      return <span className="h-3 w-3 rounded-lg bg-green-400" />;
    case "committed":
      return <span className="h-3 w-3 rounded-lg bg-green-500" />;
    case "minimum-viable-product":
      return <span className="h-3 w-3 rounded-lg bg-red-400 animate-pulse" />;
    case "live":
      return <span className="h-3 w-3 rounded-lg bg-red-500 animate-pulse" />;
  }
}

export default function ProjectState({ state, link }: Props) {
  const { t } = useTranslation();

  if (link != null) {
    return (
      <a
        className="cursor-pointer col-span-2 flex flex-row items-center gap-2"
        href={link}
        target="_blank"
      >
        <StateIndicator state={state} />
        <p className="text-xs">{t(`projects:details.states.${state}`)}</p>
      </a>
    );
  }

  return (
    <div className="col-span-2 flex flex-row items-center gap-2">
      <StateIndicator state={state} />
      <p className="text-xs">{t(`projects:details.states.${state}`)}</p>
    </div>
  );
}
