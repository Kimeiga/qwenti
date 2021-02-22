<template>
  <div>
    {{ startDate }}
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
import getDateTime from "@/getDateTime";
export default {
  props: {
    range: Object,
    startTime: Object,
    endTime: Object,
  },
  computed: {
    timeArray() {
      if (!this.range) {
        return "";
      }
      return moment
        .twix(this.startTime.toDate(), this.endTime.toDate())
        .toArray("hours");
    },
    startDate() {
      if (!this.range) {
        return "";
      }
      return getDateTime(this.range.start.toDate(), this.startTime.toDate());
    },
    endDate() {
      if (!this.range) {
        return "";
      }
      return getDateTime(this.range.end.toDate(), this.endTime.toDate());
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
  methods: {
    getDateTime(date, time) {
      return moment([
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
      ]);
    },
  },
};
</script>

<style></style>
