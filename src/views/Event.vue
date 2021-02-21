<template>
  <div>
    {{ $route.params.id }}
    {{ JSON.stringify(eventData) }}
    {{ eventData }}
  </div>
</template>

<script>
import { db } from "../db";

export default {
  data() {
    return {
      eventData: {},
      // documents: {},
    };
  },
  created() {
    // `this` points to the vm instance
    this.test();
  },
  methods: {
    test() {
      console.log(db.collection("events").doc(this.$route.params.id));
    },
    // getEventData() {
    //   return db.collection("events").doc(this.route.params.id);
    // },
  },
  // firestore: {
  //   eventData: this.getEventData(),
  // },
  // firebase() {
  //   return {
  //     eventData: {
  //       source: db.collection("events").doc(this.$route.params.id),
  //     },
  //   };
  // },
  firestore() {
    return {
      eventData: db.collection("events").doc(this.$route.params.id),
    };
  },
  // firestore: {
  //   documents: db.collection("events").doc(this.$route.params.id),
  // },
};
</script>
