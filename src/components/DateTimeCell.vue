<template>
  <div class="datetime-cell"></div>
</template>

<script>
export default {
  props: {
    datetime: Object,
    selected: Boolean,
  },
};
</script>

<style>
.datetime-cell {
  background: aqua;
  flex-grow: 1;
  border: black 1px solid;
}
</style>
