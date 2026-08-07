import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { differenceInYears } from "date-fns";
import { useTranslation } from "react-i18next";
import { matchQuery } from "../lib/api/match-query";
import { getLatestSongOfTheDayOptions } from "../lib/api/public/@tanstack/react-query.gen";
import Image from "../lib/components/image/image";
import CenteredPage from "../lib/components/pages/centered-page/centered-page";
import SpotifyIcon from "../lib/components/icons/spotify";

export default function Home() {
  const { t } = useTranslation();
  const songOfTheDayQuery = useQuery(getLatestSongOfTheDayOptions());

  return (
    <CenteredPage className="relative">
      {matchQuery(songOfTheDayQuery, {
        success: (song) => {
          const content = (
            <>
              <p className="col-span-full w-full text-lg text-neutral-800 font-bold text-center dark:text-neutral-100">
                {t("home:songOfTheDay.title")}
              </p>
              <div className="relative lg:my-2">
                <Image
                  className="h-32 w-32 lg:w-40 lg:h-40 border border-black dark:border-white"
                  url={song.coverImage}
                />
                <div className="group-hover:opacity-100 group-hover:bg-neutral-500/25 group-hover:backdrop-blur-xs absolute inset-0 z-2 grid opacity-0 place-items-center">
                  <SpotifyIcon className="w-20 h-20 fill-green-500" />
                </div>
              </div>
              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-2xl text-black font-extrabold text-start text-ellipsis dark:text-white overflow-hidden">
                  {song.title}
                </p>
                <p className="w-full text-md font-bold text-start">
                  {song.artist}
                </p>
                <p className="w-full text-sm line-clamp-3 font-light text-start">
                  {song.album}
                </p>
              </div>
            </>
          );

          return song.spotifyUrl ? (
            <a
              className="group cursor-pointer absolute bottom-2 left-2 right-2 h-fit grid grid-rows-[auto_auto] grid-cols-[auto_1fr] gap-1 p-2 lg:top-0 lg:left-8 lg:max-w-52 lg:flex lg:flex-col lg:items-center lg:p-4 bg-orange-500"
              href={song.spotifyUrl}
              target="_blank"
            >
              {content}
            </a>
          ) : (
            <div className="cursor-pointer absolute bottom-2 left-2 right-2 h-fit grid grid-rows-[auto_auto] grid-cols-[auto_1fr] gap-1 p-2 lg:top-0 lg:left-8 lg:max-w-52 lg:flex lg:flex-col lg:items-center lg:p-4 bg-orange-500">
              {content}
            </div>
          );
        },
      })}
      <div className="flex flex-col">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">
          <Link to="/cause-nobody-asked">Janne</Link>
          {" Göbel."}
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">{`${t(
          "home:content.age",
          {
            age: differenceInYears(new Date(), new Date("1999-12-30")),
          },
        )}.`}</h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">{`${t("home:content.softwareDeveloper")}.`}</h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">{`${t("home:content.blackForest")}.`}</h1>
      </div>
    </CenteredPage>
  );
}
