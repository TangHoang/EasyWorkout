<script setup>
import { RouterLink, RouterView } from 'vue-router'
let today = new Date().toLocaleString("de-DE", {weekday: "long"});
</script>

<template>
  <footer>
    <div class="wrapper">
      <nav class="navbar">
        <RouterLink to="/calendar" class="nav-btn">Calendar</RouterLink>
        <RouterLink to="/" class="nav-btn">Home</RouterLink>
        <RouterLink to="/exercise-log" class="nav-btn">Log</RouterLink>
      </nav>
    </div>
  </footer>

  <RouterView />
</template>

<style scoped>
  footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 10;
  }
  .nav-btn{
    padding: 10px 20px;
  }
  .wrapper{
    padding: 15px;
  }
  .navbar{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .navbar a{
    width: 33%;
    text-align: center;
  }
</style>
