import { fromHoursToSeconds } from "./utils";

export const HOUR_TO_MINUTES = 60;
export const MINUTE_TO_SECONDS = 60;
export const DURATION_LIMIT_IN_HOURS = 8;

export const DURATION_LIMIT_IN_SECONDS = fromHoursToSeconds(
  DURATION_LIMIT_IN_HOURS
);
