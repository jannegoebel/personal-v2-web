import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import Image from "../../lib/components/image/image";
import { useLanguage } from "../../lib/hooks/use-language";
import type { ResumeEntryType } from "./resume";
import style from "./_resume-entry.module.css";
import { safeExternalHref } from "../../lib/functions/external-link";

type Props = {
  entry: ResumeEntryType;
};

export default function ResumeEntryMobile({ entry }: Props) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const resolvedLanguage = language === "de" ? "german" : "english";

  const image = (
    <Image className="w-28 h-28" url={entry.organizationLogo} noSkeleton />
  );
  const organization = `@${entry.organization}`;
  const organizationHref = safeExternalHref(entry.organizationLink);

  return (
    <div className={`grid place-items-center ${style.fadeIn}`}>
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        {entry.organizationLogo &&
          (organizationHref ? (
            <a
              href={organizationHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {image}
            </a>
          ) : (
            image
          ))}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium">
            {entry.endAt
              ? `${format(new Date(entry.startAt), t("common:dateFormat"))} - ${format(new Date(entry.endAt), t("common:dateFormat"))}`
              : t("common:fromDate", {
                  date: format(new Date(entry.startAt), t("common:dateFormat")),
                })}
          </p>
          {entry.title && (
            <h1 className="text-lg font-bold text-orange-500">
              {entry.title[resolvedLanguage]}
            </h1>
          )}
          {organizationHref ? (
            <a
              className="text-xl font-bold line-clamp-2"
              href={organizationHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {organization}
            </a>
          ) : (
            <h3 className="text-xl font-bold line-clamp-2">{organization}</h3>
          )}
          {entry.tags && entry.tags.length > 0 && (
            <span className="hidden sm:flex flex-col lg:flex-row lg:gap-2">
              {entry.tags?.map((tag) => (
                <p
                  key={tag}
                  className="text-xs font-light opacity-75"
                >{`#${tag}`}</p>
              ))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
