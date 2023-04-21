<script>
import exerciseCard from '../components/exerciseCard.vue';
export default {
  components: {
    exerciseCard,
  },
  data() {
    return {
      exerciseList: ["Bench Press", "Squat", "Overhead Press", "Deadlift"],
      
    }
  },
  methods: {
    getCurrentDay() {
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let date = new Date();
      let today = days[date.getDay()];
      return today;
    }
  }

}
</script>

<template>
  <body>
    <header>
    <h1> {{ getCurrentDay() }}</h1>
  </header>
  <main>
    <exerciseCard v-for="exerciseTitle in exerciseList" :title="exerciseTitle"/>
  </main>
  </body>
  
</template>

<style>
  body{
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  h1{
    color: white;
  }
</style>
