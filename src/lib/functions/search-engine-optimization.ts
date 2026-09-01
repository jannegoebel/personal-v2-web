import { frontendUrl } from "./environments";

export const linkedInHref =
  "https://www.linkedin.com/in/janne-göbel-004b06238/";
export const gitHubHref = "https://github.com/jannegoebel";
export const spotifyHref =
  "https://open.spotify.com/user/315weusvj4sue4c422js5u3gfi4u?si=84454923c0de4248";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",

  name: "Janne Göbel",

  url: frontendUrl,

  sameAs: [linkedInHref, gitHubHref, spotifyHref],
};
