<template>
    <body>
        <header>
            <button @click="handleBack">Back</button>
            <h1>{{ this.exerciseName }}</h1>
            <div>{{ trainingData.data[this.exerciseName] }}</div>
        </header>
    </body>
    
</template>

<script>
    import { useDataStore } from '../stores/data.vue';
    export default {
        setup() {
            const trainingData = useDataStore();
            return {trainingData};
        },
        data() {
            return{
                hi: 1,
            }
        },
        props: {
            exerciseName: {
                type: String,
                required: true,
            }
        },
        methods: {
            handleBack() {
                this.$emit("back");
            }
        },
    }
</script>

<style>

    body {
        height: 100vh;
        width: 100vw;
    }
</style>