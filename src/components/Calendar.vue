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

    <div class="calendar" :style="cssVars">
      <div
        class="date-column"
        v-for="dateArray in date2DArray"
        :key="dateArray[0].toString()"
      >
        <DateTimeCell
          v-for="datetime in dateArray"
          :key="datetime.toString()"
          :datetime="datetime"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "twix";
import DateTimeCell from "@/components/DateTimeCell";

export default {
  components: {
    DateTimeCell,
  },
  props: {
    startTimestamp: Object,
    endTimestamp: Object,
  },
  computed: {
    cssVars() {
      return {
        "--rows": this.timeSpan,
        "--columns": this.dateSpan,
      };
    },
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
    dateSpan() {
      return moment.twix(this.startDate, this.endDate).count("days");
    },
    timeSpan() {
      return moment.duration(this.endTime - this.startTime).asMinutes() / 15;
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

      let i = 0;

      let range = Array.from(
        Array(this.dateSpan),
        () => new Array(this.timeSpan)
      );
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

<style>
/* .calendar {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
} */
.calendar {
  display: flex;
  width: 100%;
  height: 90vh;
  justify-content: stretch;
}
.calendar .date-column {
  justify-content: stretch;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
