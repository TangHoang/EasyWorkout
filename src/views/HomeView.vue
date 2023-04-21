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
  }

}
</script>

<template>
  <main>
    <exerciseCard v-for="exerciseTitle in exerciseList" :title="exerciseTitle"/>
  </main>
</template>
