import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { differenceInYears } from "date-fns";
import { useTranslation } from "react-i18next";
import { matchQuery } from "../../lib/api/match-query";
import { getLatestSongOfTheDayOptions } from "../../lib/api/public/@tanstack/react-query.gen";
import CenteredPage from "../../lib/components/pages/centered-page/centered-page";
import SongOfTheDayCard from "./_song-of-the-day-card";

export default function Home() {
  const { t } = useTranslation();
  const songOfTheDayQuery = useQuery(getLatestSongOfTheDayOptions());

  return (
    <CenteredPage className="grid grid-cols-1 grid-rows-[11rem_1fr_11rem] lg:grid-cols-[12rem_1fr_12rem] lg:grid-rows-1 lg:items-start lg:gap-x-8">
      {matchQuery(songOfTheDayQuery, {
        success: (song) => <SongOfTheDayCard song={song} />,
      })}
      <div className="h-full grid place-items-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            <Link to="/cause-nobody-asked">Janne</Link>
            {" Göbel."}
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">{`${t(
            "home:content.age",
            {
              age: differenceInYears(new Date(), new Date("1999-12-30")),
            },
          )}.`}</h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">{`${t("home:content.softwareDeveloper")}.`}</h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">{`${t("home:content.blackForest")}.`}</h1>
        </div>
      </div>
      <span />
    </CenteredPage>
  );
}
