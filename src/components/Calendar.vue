<template>
  <div>
    <h3>Start Date</h3>
    {{ startDate }}
    <h3>End Date</h3>
    {{ endDate }}
    <h3>Start Time</h3>
    {{ startTime }}
    <h3>End Time</h3>
    {{ endTime }}
    <!-- <div v-for="time in timeArray" :key="time.toString()">
      {{ time }}
    </div>
    <div v-for="date in dateArray" :key="date.toString()">
      {{ date }}
    </div>

    {{ date2DArray }} -->

    <div v-for="dateArray in date2DArray" :key="dateArray[0].toString()">
      <div v-for="datetime in dateArray" :key="datetime.toString()">
        {{ datetime }}
      </div>
    </div>
  </div>
</template>

<script>
// import { Timestamp } from "@/db";
import moment from "moment";
// import twix from "twix";
import "twix";
// import { getDateTimeMoment } from "@/getDateTime";
export default {
  props: {
    startTimestamp: Object,
    endTimestamp: Object,
  },
  computed: {
    startDate() {
      return this.startTimestamp ? this.startTimestamp.toDate() : null;
    },
    endDate() {
      return this.endTimestamp ? this.endTimestamp.toDate() : null;
    },
    startTime() {
      return this.startDate
        ? moment.duration({
            hours: this.startDate.getHours(),
            minutes: this.startDate.getMinutes(),
          })
        : null;
    },
    endTime() {
      return this.endDate
        ? moment.duration({
            hours: this.endDate.getHours(),
            minutes: this.endDate.getMinutes(),
          })
        : null;
    },
    timeArray() {
      if (!this.range) {
        return "";
      }
      return moment
        .twix(this.startTime.toDate(), this.endTime.toDate())
        .toArray("hours");
    },
    dateArray() {
      return moment.twix(this.startDate, this.endDate).toArray("days");
    },
    date2DArray() {
      if (
        !this.startDate ||
        !this.endDate ||
        !this.endTime ||
        !this.startTime
      ) {
        return;
      }
      let dateItr = moment.twix(this.startDate, this.endDate).iterate("days");
      const dateSpan = moment.twix(this.startDate, this.endDate).count("days");
      const span = this.endTime - this.startTime;
      const dur = moment.duration(span);
      const timeSpan = dur.asMinutes() / 15;

      console.log(dateSpan);
      console.log(timeSpan);
      let i = 0;

      let range = Array.from(Array(dateSpan), () => new Array(timeSpan));
      while (dateItr.hasNext()) {
        // new date
        // push all of its times
        const currentDate = moment(dateItr.next().toDate());
        // let quarterHourItr = moment
        //   .twix(currentDate.add(this.startTime), currentDate.add(this.endTime))
        //   .iterate(15, "minutes");
        const start = moment(currentDate).add(this.startTime);
        const end = moment(currentDate).add(this.endTime);
        const a = start.twix(end).toArray(15, "minutes");

        range[i] = a;

        // let j = 0;
        // while (quarterHourItr.hasNext()) {
        //   range[i][j] = quarterHourItr.next().toDate();
        //   j++;
        // }

        // range.push(currentDate.toDate());
        i++;
      }

      return range;
    },
  },
};
</script>

<style></style>
