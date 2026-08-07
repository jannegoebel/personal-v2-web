import GithubIcon from "../lib/components/icons/github";
import LinkedInIcon from "../lib/components/icons/linked-in";
import MailIcon from "../lib/components/icons/mail";
import Image from "../lib/components/image/image";
import CenteredPage from "../lib/components/pages/centered-page/centered-page";

import meCode from "/images/me-code.jpg";
import meCoding from "/images/me-coding.jpg";
import meCurtain from "/images/me-curtain.jpg";
import meCzechia from "/images/me-czechia.jpg";
import meDontKnow from "/images/me-dont-know.jpg";
import meFishmarket from "/images/me-fishmarket.jpg";
import meGym from "/images/me-gym.jpg";
import meHockey from "/images/me-hockey.png";
import meRearView from "/images/me-rear-view.jpg";
import meSofa from "/images/me-sofa.jpg";

function getContactImage() {
  const random = Math.floor(Math.random() * 10);

  switch (random) {
    case 0:
      return meCoding;
    case 1:
      return meCurtain;
    case 2:
      return meCzechia;
    case 3:
      return meDontKnow;
    case 4:
      return meFishmarket;
    case 5:
      return meGym;
    case 6:
      return meHockey;
    case 7:
      return meRearView;
    case 8:
      return meSofa;
    case 9:
    default:
      return meCode;
  }
}

export default function Contact() {
  return (
    <CenteredPage>
      <div className="grid grid-cols-[auto_auto_auto] grid-rows-[auto_auto] place-items-center gap-y-8 gap-x-4">
        <Image
          className="col-span-3 h-40 w-40 md:h-60 md:w-60 rounded-full border-2 border-black dark:border-white"
          classNameImage="object-cover"
          url={getContactImage()}
        />
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
      </div>
    </CenteredPage>
  );
}
