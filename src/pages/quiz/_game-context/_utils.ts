import type { TFunction } from "i18next";

export function getLevelName(current: number, t: TFunction) {
  return t(`quiz:content.level.${current}`);
}
