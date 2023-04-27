<template>
  <div class="calendar">
    <h1>This is the Calendar Page</h1>
    <button @click="count++"></button>
    <h3>{{ count }}</h3>
  </div>
</template>

<script>
    export default {
        name: "CalendarView",
        data() {
            return {
                count: 0,
            }
        },
    }
</script>

<style>
@media (min-width: 1024px) {
  .exercise-log {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
