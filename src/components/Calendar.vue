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

    <div v-for="dateArray in date2DArray" :key="dateArray[0].toString()">
      <div v-for="datetime in dateArray" :key="datetime.toString()">
        {{ datetime }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "twix";
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
      const timeSpan =
        moment.duration(this.endTime - this.startTime).asMinutes() / 15;

      let i = 0;

      let range = Array.from(Array(dateSpan), () => new Array(timeSpan));
      while (dateItr.hasNext()) {
        // new date
        // push all of its times
        const currentDate = moment(dateItr.next().toDate());

        range[i] = moment(currentDate)
          .add(this.startTime)
          .twix(moment(currentDate).add(this.endTime))
          .toArray(15, "minutes");
        i++;
      }

      return range;
    },
  },
};
</script>

<style></style>
