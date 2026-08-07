import type z from "zod";
import type { zGetProjectDetailsResponse } from "../../../lib/api/public/zod.gen";
import style from "./details.module.css";
import { useLanguage } from "../../../lib/hooks/use-language";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import ProjectState from "./_project-state";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlankPage from "../../../lib/components/pages/blank-page/blank-page";

export type Project = z.infer<typeof zGetProjectDetailsResponse.shape.payload>;

type Props = {
  project: Project;
};

export default function ProjectDetails({ project }: Props) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const resolvedLanguage = language === "de" ? "german" : "english";

  return (
    <BlankPage className={style.Project}>
      <div className="max-w-[80ch] w-full flex flex-col gap-4 overflow-y-auto">
        {project.titleImage && (
          <div className="w-full grid place-items-center">
            <img
              className="object-cover object-center"
              src={project.titleImage}
            />
          </div>
        )}
        <div className="w-full grid grid-cols-[5rem_1fr] grid-rows-[5rem_auto] gap-4 items-center">
          {project.logo && (
            <div className="h-full w-full grid place-items-center">
              <img
                className="object-contain object-center"
                src={project.logo}
              />
            </div>
          )}
          <h1
            className={`${project.logo ? "col-span-1" : "col-span-2"} w-full text-2xl line-clamp-2 lowercase`}
          >
            {project[resolvedLanguage].title}
          </h1>
          {project.state && (
            <div className="col-span-2 flex flex-row justify-between items-center">
              <p className="text-xs">
                {format(new Date(project.updatedAt), t("common:dateFormat"))}
              </p>
              <ProjectState state={project.state} link={project.link} />
            </div>
          )}
        </div>
        <div className={style.Markdown}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            /*components={{
                input: ({ checked }) => (
                  <Checkbox checked={checked ?? false} disabled />
                ),
              }}*/
          >
            {project[resolvedLanguage].description}
          </ReactMarkdown>
        </div>
      </div>
    </BlankPage>
  );
}
