<template>
  <div>
    <h3>Start Date</h3>
    {{ startDate }}
    <h3>End Date</h3>
    {{ endDate }}
    <div v-for="time in timeArray" :key="time.toString()">
      {{ time }}
    </div>
    <div v-for="date in dateArray" :key="date.toString()">
      {{ date }}
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
    timeArray() {
      if (!this.range) {
        return "";
      }
      return moment
        .twix(this.startTime.toDate(), this.endTime.toDate())
        .toArray("hours");
    },
    dateArray() {
      if (!this.range) {
        return [];
      }
      // var itr = moment
      //   .twix(new Date("2012-01-15"), new Date("2012-01-20"))
      //   .iterate("days");
      return moment
        .twix(this.range.start.toDate(), this.range.end.toDate())
        .toArray("days");
    },
    date2DArray() {
      let dateItr = moment.twix(this.startDate, this.endDate).iterate("days");
      var range = [];
      while (dateItr.hasNext()) {
        // new date
        // push all of its times

        range.push(dateItr.next().toDate());
      }
      return range;
    },
  },
};
</script>

<style></style>
