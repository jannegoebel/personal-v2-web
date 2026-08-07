import { differenceInMonths } from "date-fns";

function getTotalMonths(start: Date) {
  return differenceInMonths(new Date(), start);
}

export function getPosition(start: Date, date: Date) {
  return differenceInMonths(date, start) / getTotalMonths(start);
}
