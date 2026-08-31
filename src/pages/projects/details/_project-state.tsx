import { useTranslation } from "react-i18next";
import type { Project } from "./details";
import { safeExternalHref } from "../../../lib/utilization/external-link";

type Props = {
  state: Project["state"];
  link?: string | null;
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
    default:
      return <span className="h-3 w-3 rounded-lg bg-neutral-300" />;
  }
}

export default function ProjectState({ state, link }: Props) {
  const { t } = useTranslation();
  const href = safeExternalHref(link);

  if (href) {
    return (
      <a
        className="cursor-pointer col-span-2 flex flex-row items-center gap-2"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
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
