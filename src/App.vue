<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
// test
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Freitag"/>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/exercise-log">Log</RouterLink>
        <RouterLink to="/calendar">Calendar</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
