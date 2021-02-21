<template>
  <model-list-select
    v-model="selectedTimezone"
    :list="timezones"
    option-value="value"
    placeholder="select item"
    :custom-text="timezoneText"
    @input="$emit('update:selectedTimezone', $event)"
  >
  </model-list-select>
</template>

<script>
import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";

import timezones from "../assets/timezones.json";

export default {
  components: {
    ModelListSelect,
  },
  data() {
    return {
      timezones,
      selectedTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  },
  methods: {
    timezoneText(item) {
      return `(UTC${item.offset}) ${item.label}`;
    },
  },
};
</script>
