import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type z from "zod";
import type { zGetProjectsOverviewResponse } from "../../lib/api/public/zod.gen";
import IconButton from "../../lib/components/button/icon-button";
import CenteredPage from "../../lib/components/pages/centered-page/centered-page";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Image from "../../lib/components/image/image";
import { useLanguage } from "../../lib/hooks/use-language";
import BlankPage from "../../lib/components/pages/blank-page/blank-page";

type Projects = z.infer<typeof zGetProjectsOverviewResponse.shape.payload>;

type Props = {
  projects: Projects;
};

export default function ProjectsOverview({ projects }: Props) {
  const { language } = useLanguage();
  const resolvedLanguage = language === "de" ? "german" : "english";

  const [smallStartIndex, setSmallStartIndex] = useState(0);

  const projectsAmount = projects.length;
  const smallDisplayed = projects.slice(smallStartIndex, smallStartIndex + 5);

  function handleSmallPreviousPage() {
    setSmallStartIndex((current) => {
      const newStartIndex = current + 5;
      return newStartIndex < 0 ? 0 : newStartIndex;
    });
  }
  function handleSmallNextPage() {
    setLargeStartIndex((current) => {
      const newStartIndex = current + 5;
      const newRestLength = projectsAmount - newStartIndex;
      return newRestLength < 5 ? projectsAmount - 5 : newStartIndex;
    });
  }

  const [largeStartIndex, setLargeStartIndex] = useState(0);

  const largeDisplayed = projects.slice(largeStartIndex, largeStartIndex + 10);

  function handleLargePreviousPage() {
    setLargeStartIndex((current) => {
      const newStartIndex = current - 10;
      return newStartIndex < 0 ? 0 : newStartIndex;
    });
  }
  function handleLargeNextPage() {
    setLargeStartIndex((current) => {
      const newStartIndex = current + 10;
      const newRestLength = projectsAmount - newStartIndex;
      return newRestLength < 10 ? projectsAmount - 10 : newStartIndex;
    });
  }

  return (
    <>
      <BlankPage className="grid grid-cols-[repeat(auto-fit,15rem)] justify-center auto-rows-60 gap-4 lg:hidden">
        {projects.map((project) => (
          <Link
            key={project.id}
            className="bg-neutral-500/25 p-2 hover:bg-orange-500"
            to={`/projects/${project.id}`}
          >
            {project.logo && (
              <Image className="w-full h-full" url={project.logo} />
            )}
          </Link>
        ))}
        {Array.from({ length: 12 - projectsAmount }, (_, i) => (
          <span key={`placeholder-${i}`} className="bg-neutral-500/25" />
        ))}
      </BlankPage>
      <CenteredPage className="hidden lg:grid">
        <div className="h-full max-h-140 xl:max-h-160 2xl:max-h-140 3xl:max-h-160 grid grid-cols-[auto_auto_auto] items-center gap-4">
          <div className="h-full lg:flex 2xl:hidden gap-2 overflow-hidden">
            {projectsAmount > 5 && (
              <IconButton
                onClick={handleSmallPreviousPage}
                disabled={smallStartIndex === 0}
              >
                <ChevronLeftIcon />
              </IconButton>
            )}
            {largeDisplayed.map((project) => (
              <Link
                key={project.id}
                className="group w-16 xl:w-20 grid grid-rows-[1fr_4rem] xl:grid-rows-[1fr_5rem] hover:bg-orange-500 transition-[width] delay-250 duration-500 ease-out hover:w-160 xl:hover:w-200 overflow-hidden"
                to={`/projects/${project.id}`}
              >
                <div className="relative w-160 xl:w-200">
                  {project.titleImage && (
                    <Image
                      className="absolute inset-0 h-full w-full"
                      classNameImage="min-h-full min-w-full object-cover grayscale-100"
                      url={project.titleImage}
                    />
                  )}
                </div>
                <div className="w-160 xl:w-200 grid grid-cols-[3.5rem_1fr] xl:grid-cols-[4.5rem_1fr] items-center gap-1 p-1 bg-neutral-500/25 overflow-hidden">
                  {project.logo ? (
                    <Image
                      className="w-14 h-14 xl:w-18 xl:h-18"
                      url={project.logo}
                    />
                  ) : (
                    <span />
                  )}
                  <h1 className="w-full text-2xl font-extrabold whitespace-nowrap text-ellipsis overflow-hidden">
                    {project[resolvedLanguage].title}
                  </h1>
                </div>
              </Link>
            ))}
            {Array.from({ length: 5 - smallDisplayed.length }, (_, i) => (
              <span
                key={`placeholder-${i}`}
                className="w-16 xl:w-20 grid grid-rows-[1fr_4rem] xl:grid-rows-[1fr_5rem] bg-neutral-500/25"
              />
            ))}
            {projectsAmount > 5 && (
              <IconButton onClick={handleSmallNextPage}>
                <ChevronRightIcon />
              </IconButton>
            )}
          </div>
          <div className="hidden h-full 2xl:flex gap-2 overflow-hidden">
            {projectsAmount > 10 && (
              <IconButton
                onClick={handleLargePreviousPage}
                disabled={largeStartIndex === 0}
              >
                <ChevronLeftIcon />
              </IconButton>
            )}
            {largeDisplayed.map((project) => (
              <Link
                key={project.id}
                className="group w-16 3xl:w-20 grid grid-rows-[1fr_4rem] 3xl:grid-rows-[1fr_5rem] hover:bg-orange-500 transition-[width] delay-250 duration-500 ease-out hover:w-160 3xl:hover:w-200 overflow-hidden"
                to={`/projects/${project.id}`}
              >
                <div className="relative w-160 3xl:w-200">
                  {project.titleImage && (
                    <Image
                      className="absolute inset-0 h-full w-full"
                      classNameImage="min-h-full min-w-full object-cover grayscale-100"
                      url={project.titleImage}
                    />
                  )}
                </div>
                <div className="w-160 3xl:w-200 grid grid-cols-[3.5rem_1fr] 3xl:grid-cols-[4.5rem_1fr] items-center gap-1 p-1 bg-neutral-500/25 overflow-hidden">
                  {project.logo ? (
                    <Image
                      className="w-14 h-14 3xl:w-18 3xl:h-18"
                      url={project.logo}
                    />
                  ) : (
                    <span />
                  )}
                  <h1 className="w-full text-2xl font-extrabold whitespace-nowrap text-ellipsis overflow-hidden">
                    {project[resolvedLanguage].title}
                  </h1>
                </div>
              </Link>
            ))}
            {Array.from({ length: 10 - largeDisplayed.length }, (_, i) => (
              <span
                key={`placeholder-${i}`}
                className="w-16 3xl:w-20 grid grid-rows-[1fr_4rem] 3xl:grid-rows-[1fr_5rem] bg-neutral-500/25"
              />
            ))}
            {projectsAmount > 10 && (
              <IconButton
                onClick={handleLargeNextPage}
                disabled={projectsAmount - largeStartIndex <= 10}
              >
                <ChevronRightIcon />
              </IconButton>
            )}
          </div>
        </div>
      </CenteredPage>
    </>
  );
}
