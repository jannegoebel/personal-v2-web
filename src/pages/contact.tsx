import type { GetUserProfileImagesResponse } from "../lib/api/public";
import GithubIcon from "../lib/components/icons/github";
import LinkedInIcon from "../lib/components/icons/linked-in";
import MailIcon from "../lib/components/icons/mail";
import SpotifyIcon from "../lib/components/icons/spotify";
import Image from "../lib/components/image/image";
import CenteredPage from "../lib/components/pages/centered-page/centered-page";

function getRandomProfileImage(profileImages: ProfileImages) {
  const random = Math.floor(Math.random() * profileImages.length);
  return profileImages.at(random);
}

type ProfileImages = GetUserProfileImagesResponse["payload"];
type Props = {
  profileImages: ProfileImages;
};

export default function Contact({ profileImages }: Props) {
  return (
    <CenteredPage>
      <div className="grid grid-cols-[auto_auto_auto_auto] grid-rows-[auto_auto] place-items-center gap-y-8 gap-x-4">
        {profileImages.length === 0 ? (
          <span />
        ) : (
          <Image
            className="col-span-full h-40 w-40 md:h-60 md:w-60 rounded-full border-2 border-black dark:border-white"
            classNameImage="object-cover"
            url={getRandomProfileImage(profileImages)}
          />
        )}
        <a href="mailto:info@jannegoebel.de" target="_blank">
          <MailIcon className="w-14 h-14 md:w-20 md:h-20 fill-black dark:fill-white hover:fill-orange-500 dark:hover:fill-orange-500" />
        </a>
        <a
          href="https://www.linkedin.com/in/janne-göbel-004b06238/"
          target="_blank"
        >
          <LinkedInIcon className="w-14 h-14 md:w-20 md:h-20 fill-black dark:fill-white hover:fill-orange-500 dark:hover:fill-orange-500" />
        </a>
        <a href="https://github.com/jannegoebel" target="_blank">
          <GithubIcon className="w-14 h-14 md:w-20 md:h-20 fill-black dark:fill-white hover:fill-orange-500 dark:hover:fill-orange-500" />
        </a>
        <a
          href="https://open.spotify.com/user/315weusvj4sue4c422js5u3gfi4u?si=84454923c0de4248"
          target="_blank"
        >
          <SpotifyIcon className="w-14 h-14 md:w-20 md:h-20 fill-black dark:fill-white hover:fill-orange-500 dark:hover:fill-orange-500" />
        </a>
      </div>
    </CenteredPage>
  );
}
