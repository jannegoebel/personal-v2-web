import { useTranslation } from "react-i18next";
import type { GetLatestSongOfTheDayResponse } from "../../lib/api/public";
import SpotifyIcon from "../../lib/components/icons/spotify";
import Image from "../../lib/components/image/image";
import { safeExternalHref } from "../../lib/functions/external-link";

type Props = {
  song: GetLatestSongOfTheDayResponse["payload"];
};

export default function SongOfTheDayCard({ song }: Props) {
  const { t } = useTranslation();
  const spotifyHref = safeExternalHref(song.spotifyUrl);

  const content = (
    <>
      <p className="col-span-full w-full text-lg text-neutral-800 font-bold text-center dark:text-neutral-100">
        {t("home:songOfTheDay.title")}
      </p>
      <div className="relative lg:my-2">
        <Image
          className="size-24 md:size-32 lg:size-40 border border-black dark:border-white"
          url={song.coverImage}
        />
        <div className="group-hover:opacity-100 group-hover:bg-neutral-500/25 group-hover:backdrop-blur-xs absolute inset-0 z-2 grid opacity-0 place-items-center">
          <SpotifyIcon className="w-20 h-20 fill-green-500" />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center">
        <p className="w-full text:xl md:text-2xl text-black font-extrabold text-start text-ellipsis dark:text-white overflow-hidden">
          {song.title}
        </p>
        <p className="w-full text-sm md:text-md font-bold text-start">
          {song.artist}
        </p>
        <p className="w-full text-xs md:text-sm line-clamp-3 font-light text-start">
          {song.album}
        </p>
      </div>
    </>
  );

  return spotifyHref ? (
    <a
      className="group cursor-pointer max-w-full max-h-full lg:h-fit grid grid-rows-[auto_auto] grid-cols-[auto_1fr] gap-1 p-2 lg:top-0 lg:left-8 lg:max-w-52 lg:flex lg:flex-col lg:items-center lg:p-4 bg-orange-500"
      href={spotifyHref}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <div className="cursor-pointer max-w-full max-h-full lg:h-fit grid grid-rows-[auto_auto] grid-cols-[auto_1fr] gap-1 p-2 lg:top-0 lg:left-8 lg:max-w-52 lg:flex lg:flex-col lg:items-center lg:p-4 bg-orange-500">
      {content}
    </div>
  );
}
