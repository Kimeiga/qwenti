<template>
  <div class="datetime-cell">
    <div class="datetime-cell-0"></div>
    <div class="datetime-cell-15"></div>
    <div class="datetime-cell-30"></div>
    <div class="datetime-cell-45"></div>
  </div>
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
  background: #808080;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.datetime-cell:last-child {
  border-bottom: 1px black solid;
}
.datetime-cell .datetime-cell-0 {
  /* height: 25%; */
  flex-grow: 1;
  border-left: 1px black solid;
  border-top: 1px black solid;
}
.datetime-cell .datetime-cell-15 {
  /* height: 25%; */
  border-left: 1px black solid;
  flex-grow: 1;
}
.datetime-cell .datetime-cell-30 {
  /* height: 25%; */
  border-left: 1px black solid;
  border-top: 1px black dotted;
  flex-grow: 1;
}
.datetime-cell .datetime-cell-45 {
  /* height: 25%; */
  border-left: 1px black solid;
  flex-grow: 1;
}
</style>
