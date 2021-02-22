<template>
  <div>
    <div class="calendar">
      <div class="hour-column">
        <div
          v-for="hour in hourSpan"
          :key="hour.toString()"
          class="hour-marker"
          :data-hour="hour.format('h A')"
          :data-hour-plus-one="hour.add({ hour: 1 }).format('h A')"
        >
          <!-- {{ hour.hour() }} -->
        </div>
      </div>
      <div
        class="date-column"
        v-for="dateArray in date2DArray"
        :key="dateArray[0].toString()"
      >
        <HourCell
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
import HourCell from "@/components/HourCell";

export default {
  components: {
    HourCell,
  },
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
    hourSpan() {
      if (
        !this.startDate ||
        !this.endDate ||
        !this.endTime ||
        !this.startTime
      ) {
        return;
      }
      return moment(this.startDate)
        .twix(moment(this.startDate).add(this.endTime - this.startTime))
        .toArray("hours");
    },
    dateCount() {
      return moment.twix(this.startDate, this.endDate).count("days");
    },
    hourCount() {
      return moment.duration(this.endTime - this.startTime).asHours();
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
        Array(this.dateCount),
        () => new Array(this.hourCount)
      );
      while (dateItr.hasNext()) {
        // new date
        // push all of its times
        const currentDate = moment(dateItr.next().toDate());

        range[i] = moment(currentDate)
          .add(this.startTime)
          .twix(moment(currentDate).add(this.endTime))
          .toArray("hours");
        i++;
      }

      return range;
    },
  },
};
</script>

<style>
.calendar {
  display: flex;
  position: relative;
  /* width: 100%; */
  height: 90vh;
  justify-content: stretch;
  /* margin: 30px; */
}
.calendar .date-column {
  justify-content: stretch;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.hour-column {
  justify-content: stretch;
  display: flex;
  flex-direction: column;
  flex-grow: 3;
}

.date-column:last-child {
  border-right: 1px black solid;
}
.inner-calendar {
  border-right: 1px black solid;
  border-bottom: 1px black solid;
}
.hour-marker {
  flex-grow: 1;
}
.hour-marker:before {
  position: absolute;
  content: attr(data-hour);
  transform: translate(-100%, -50%);
  left: 10%;
}
.hour-marker:last-child::after {
  position: absolute;
  content: attr(data-hour-plus-one);
  transform: translate(-100%, 50%);
  left: 10%;
  bottom: 0;
}
</style>
