<template>
    <body>
      <header>
      <h1> {{ getCurrentDay() }}</h1>
      <h2> {{ getCurrentDatum() }}</h2>
    </header>
    <main>
      <exerciseCard />
    </main>
    </body>
    
  </template>

<script>
    import exerciseCard from '../components/exerciseCard.vue';
   
    export default {
        components: {
            exerciseCard,
        },
        data() {
            return {
            // exerciseList: ["Bench Press", "Squat", "Overhead Press", "Deadlift"],
            
            }
        },
        methods: {
            getCurrentDay() {
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let date = new Date();
            let weekday = days[date.getDay()];
            return weekday;
            },
            getCurrentDatum() {
            let date = new Date();
            let datum = date.toLocaleDateString("de-DE", {dateStyle: "medium"});
            return datum;
            }
        }

    }
</script>

<style>
    * {
        color: rgb(69, 69, 69);
    }
  body{
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  h1 {
    text-align: center;
  }
  
  h2 {
    text-align: center;
  }
</style>
