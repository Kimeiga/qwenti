<template>
  <div>
    <h1>{{ data.eventName }}</h1>
    {{ JSON.stringify(data, 0, 2) }}
  </div>
</template>

<script>
import { db } from "../db";

export default {
  data() {
    return {
      data: {},
    };
  },
  firestore() {
    return {
      data: db.collection("events").doc(this.$route.params.id),
    };
  },
};
</script>
