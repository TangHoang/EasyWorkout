<template>
    <div v-if="showConfirm == false" @click="handleClick(this.exercise)"> {{ this.exercise }}</div>
    <div class="warning-msg" v-if="showConfirm == true">Your data will be lost forever. Are you sure?</div>
    <button v-if="showConfirm == false" class="delete-btn" @click="showConfirm = true">X</button>
    <button class="return-btn" v-if="showConfirm" @click="showConfirm = false">Return</button>
    <button class="confirm-btn" v-if="showConfirm" @click="deleteExerciseItem(this.exercise)">Delete</button>
</template>

<script>
    import { useDataStore } from '../stores/data.vue';
    export default {
        setup(){
            const trainingData = useDataStore();
            return {trainingData};
        },
        data() {
            return {
                showConfirm: false,
            }
        },
        methods: {
            handleClick(currentExercise) {
                this.$emit("showLogPage", currentExercise);
            },
            deleteExerciseItem(exercise) {
                this.$emit("deleteLog", exercise);
                this.showConfirm = false;
            },
        },
        props: {
            exercise: {
                type: String,
                required: true,
            }
        },
        emits: ["showLogPage", "deleteLog"],
        mounted() {
            this.exerciseList = this.trainingData.currentExercises.map(element => element.name);
        },
    }
</script>

<style>

</style>