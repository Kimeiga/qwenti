import moment from "moment";

function getDateTime(date, time) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes()
  );
}

function getDateTimeMoment(date, time) {
  return moment([
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
  ]);
}

export { getDateTime, getDateTimeMoment };
