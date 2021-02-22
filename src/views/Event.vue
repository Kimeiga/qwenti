<template>
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

    <Calendar
      :range="event.range"
      :startTime="event.startTime"
      :endTime="event.endTime"
    />
  </div>
</template>

<script>
import { db } from "../db";
import TimezonePicker from "@/components/TimezonePicker.vue";
import Calendar from "@/components/Calendar.vue";

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
  firestore() {
    return {
      event: db.collection("events").doc(this.$route.params.id),
    };
  },
};
</script>
