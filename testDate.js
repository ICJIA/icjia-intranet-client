const dayjs = require("dayjs");
const now = new Date();
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const advancedFormat = require("dayjs/plugin/advancedFormat");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Chicago");
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

const displayDate = function (d = now, displayFormat = "MMMM DD, YYYY") {
  return dayjs(d).format(displayFormat);
};

const displayTime = function (d = now, displayFormat = "h:m A") {
  return dayjs(d).format(displayFormat);
};

const timeFromDate = function (d = now, hideSuffix = false) {
  return dayjs(d).fromNow(hideSuffix);
};

const dateDiff = function (
  d1 = now,
  d2 = now,
  unit = "hours",
  absolute = true
) {
  const date1 = dayjs(d1);
  const date2 = dayjs(d2);
  let diff = date1.diff(date2, unit);

  if (absolute) {
    diff = Math.abs(diff);
  }
  return diff;
};

console.log(displayDate());
