import moment from "moment";

function getDateTime(date, time) {
  return moment([
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
  ]);
}

export default getDateTime;
