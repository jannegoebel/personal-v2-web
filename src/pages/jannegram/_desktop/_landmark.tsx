import { format } from "date-fns";
import type { Landmark } from "../jannegram";
import { useTranslation } from "react-i18next";
import Image from "../../../lib/components/image/image";
import { useState } from "react";
import IconButton from "../../../lib/components/button/icon-button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import style from "./_landmark.module.css";
import Dialog from "../../../lib/components/dialog/dialog";

type Props = {
  landmark: Landmark;
};

export default function Landmark({ landmark }: Props) {
  const { t } = useTranslation();

  const date = landmark.date;
  const locationName = landmark.locationName;
  const tags = landmark.tags;
  const images = landmark.images;

  const [maximize, setMaximize] = useState(false);
  const [displayImageIndex, setDisplayImageIndex] = useState(0);

  function handlePreviousImage() {
    setDisplayImageIndex((current) => {
      const newIndex = current - 1;
      if (newIndex < 0) {
        return images.length - 1;
      } else {
        return newIndex;
      }
    });
  }
  function handleNextImage() {
    setDisplayImageIndex((current) => {
      const newIndex = current + 1;
      if (newIndex > images.length - 1) {
        return 0;
      } else {
        return newIndex;
      }
    });
  }

  return (
    <div className="hidden w-full h-full md:flex flex-col items-center justify-end-safe">
      {date && (
        <p className="w-full max-w-100 text-md font-medium">
          {format(new Date(date), t("common:dateFormat"))}
        </p>
      )}
      {locationName && (
        <h1 className="w-full max-w-100 text-xl font-bold text-orange-500">
          {locationName}
        </h1>
      )}
      {tags && tags.length > 0 && (
        <div className="w-full max-w-100 flex flex-row flex-wrap">
          {tags.map((tag) => (
            <p
              key={tag}
              className="text-sm font-light opacity-75"
            >{`#${tag}`}</p>
          ))}
        </div>
      )}
      <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] place-items-center gap-x-2 gap-y-1">
        <IconButton onClick={handlePreviousImage}>
          <ChevronLeftIcon />
        </IconButton>
        <button
          key={`displayed-image-${displayImageIndex}`}
          className={`cursor-pointer w-100 h-120 ${style.fadeIn}`}
          onClick={() => setMaximize(true)}
        >
          <Image
            className="h-full w-full"
            classNameImage="object-center object-cover"
            url={images.at(displayImageIndex)}
          />
        </button>
        <IconButton onClick={handleNextImage}>
          <ChevronRightIcon />
        </IconButton>
        <span className="col-span-full grid place-items-center">
          <p className="text-sm font-light">
            {`${displayImageIndex + 1} / ${images.length}`}
          </p>
        </span>
      </div>
      {maximize && (
        <Dialog
          key={`jannegram-landmark-dialog-${maximize}`}
          className="relative w-full max-w-240 h-full max-h-240"
          onClose={() => setMaximize(false)}
        >
          <Image
            className="absolute inset-0 w-full h-full"
            classNameImage="object-cover"
            url={images.at(displayImageIndex)}
          />
          <div className="absolute top-0 bottom-0 left-0 grid place-items-center z-2 p-2">
            <IconButton
              className="w-16 h-16 justify-center bg-orange-500"
              onClick={handlePreviousImage}
            >
              <ChevronLeftIcon className="w-12 h-12" />
            </IconButton>
          </div>
          <div className="absolute top-0 bottom-0 right-0 grid place-items-center z-2 p-2">
            <IconButton
              className="w-16 h-16 justify-center bg-orange-500"
              onClick={handleNextImage}
            >
              <ChevronRightIcon className="w-12 h-12" />
            </IconButton>
          </div>
          <div className="absolute bottom-0 left-0 right-0 grid place-items-center z-2 p-2">
            <div className="bg-orange-500 px-2 py-1">
              <p className="text-md font-medium">
                {`${displayImageIndex + 1} / ${images.length}`}
              </p>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
