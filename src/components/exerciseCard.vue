<template>
  <div class="card">
    <div class="card-header">
      <h1>{{ title }}</h1>
      <button>X</button>
    </div>
   
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  }
}
</script>
