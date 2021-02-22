<template>
  <div class="event">
    <div>
      <h1>{{ event.eventName }}</h1>
      {{ JSON.stringify(event, 0, 2) }}
      <h2>Your Timezone</h2>
      <TimezonePicker @update:selectedTimezone="yourTimezone = $event" />
      <h2>Sign In</h2>
      <label for="name">Your Name:</label>
      <input type="text" name="name" id="name" />
      <label for="password">Your Password (optional)</label>
      <input type="password" name="password" id="password" />
      <button>Sign In</button>
    </div>

    <Calendar
      :startTimestamp="event.startTimestamp"
      :endTimestamp="event.endTimestamp"
    />
  </div>
</template>

<script>
import { db } from "../db";
import TimezonePicker from "@/components/TimezonePicker.vue";
import Calendar from "@/components/Calendar.vue";
import moment from "moment";

export default {
  components: {
    TimezonePicker,
    Calendar,
  },
  data() {
    return {
      event: {},
      yourTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  },
  computed: {
    startDate() {
      return this.event.startTimestamp
        ? this.event.startTimestamp.toDate()
        : null;
    },
    endDate() {
      return this.event.endTimestamp ? this.event.endTimestamp.toDate() : null;
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
  },
  firestore() {
    return {
      event: db.collection("events").doc(this.$route.params.id),
    };
  },
};
</script>

<style scoped>
.event {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.event > div {
  /* flex-grow: 1; */
}
</style>
