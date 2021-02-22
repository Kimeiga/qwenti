<template>
  <div class="container">
    <h1>Qwenti</h1>
    <p>The easiest way to schedule a group meeting.</p>
    <hr />

    <h2>Create New Event</h2>
    <input v-model="eventName" type="text" placeholder="Event Name" />
    <h3>Date Range</h3>
    <vc-date-picker
      v-model="range"
      :attributes="attrs"
      :columns="$screens({ default: 1, md: 2 })"
      :rows="$screens({ default: 2, md: 1 })"
      is-range
      is-dark
    />
    <h3>Start Time Range</h3>
    <vc-date-picker
      v-model="startTime"
      mode="time"
      :timezone="timezone"
      :minute-increment="30"
      is-dark
    />
    <h3>End Time Range</h3>

    <vc-date-picker
      v-model="endTime"
      mode="time"
      :timezone="timezone"
      :minute-increment="30"
      is-dark
    />
    <h3>Time Zone</h3>
    <TimezonePicker @update:selectedTimezone="timezone = $event" />

    <button @click="addEvent()">
      Create Event
    </button>
  </div>
</template>

<script>
import TimezonePicker from "@/components/TimezonePicker.vue";
import { db } from "@/db";
import { getDateTime } from "@/getDateTime";

export default {
  name: "Home",
  components: {
    TimezonePicker,
  },
  data() {
    const startTime = new Date();
    startTime.setHours(9, 0, 0);

    const endTime = new Date();
    endTime.setHours(17, 0, 0);
    return {
      range: {
        start: new Date(),
        end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      },
      startTime,
      endTime,
      attrs: [
        {
          key: "today",
          dot: true,
          dates: new Date(),
        },
      ],
      eventName: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  },
  methods: {
    addEvent() {
      const eventName = this.eventName ? this.eventName : "Event";

      const startTimestamp = getDateTime(this.range.start, this.startTime);
      const endTimestamp = getDateTime(this.range.end, this.endTime);

      db.collection("events")
        .add({
          startTimestamp,
          endTimestamp,
          eventName,
          timezone: this.timezone,
        })
        .then((docRef) => {
          this.$router.push(docRef.id);
        });
    },
  },
};
</script>

<style>
.vc-date {
  display: none !important;
}
</style>
