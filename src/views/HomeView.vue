<template>
    <body>
        <header>
            <!-- computed prop-->
            <h1> {{ currentDay }}</h1>
            <h2> {{ currentDatum }}</h2>
        </header>

        <div id="main-container">
            <exercise-card :exercisesData="this.exercisesData" :exerciseName="exercise.name" v-for="exercise in exercisesData" :key="exercise.name" @delete="deleteCard(exercise.name)"/>
        </div>
        <!-- bidde in chooseExercise-->
        <div id="choose-exercise-container">
            <button @click="showComponent = true" class="choose-exercise-btn">Choose Exercise</button>
            <div class="popup-overlay" v-if="showComponent">
                <div class="popup-content" @click.stop>
                    <button @click="showComponent = false" class="close-overlay-btn">Close</button>
                    <choose-exercise @insert="insertExercise"/>
                </div>
            </div>  
        </div>
    </body>
</template>

<script>
    import ExerciseCard from '../components/exerciseCard.vue';
    import ChooseExercise from '../components/chooseExercise.vue';
   
    export default{
        components: {
            ExerciseCard,
            ChooseExercise,
        },
        data() {
            return {
            // exerciseList: ["Bench Press", "Squat", "Overhead Press", "Deadlift"],
            showComponent: false,
            exercisesData: [
                {name: "Squat", sets: [{set: 1, weight: 100, reps: 10}]}
                ],
            }
        },
        computed: {
            currentDay() {
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let date = new Date();
            let weekday = days[date.getDay()];
            return weekday;
            },

            currentDatum() {
            let date = new Date();
            let datum = date.toLocaleDateString("de-DE", {dateStyle: "medium"});
            return datum;
            },
        },
        methods: {
            insertExercise(name) {
                this.exercises.push({name: name, set: 1});
                this.showComponent = false;
                console.log(this.exercises)
            },
            deleteCard(name) {
                let index = this.exercises.findIndex((item) => item.name == name);
                this.exercises.splice(index, 1);
            }
        }
    }

</script>

<style>
    @import '../assets/base.css';

    * {
        color: rgb(69, 69, 69);
    }

    header {
        margin-top: 15px;
    }

    #main-container {
        width: 90%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    .component-container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 30px;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    #choose-exercise-container {
        margin-top: 20px;
    }

    .choose-exercise-btn {
        background-color: #fcfcfc;
        border-radius: 5px;
        border: none;
        color: orange;
        font-size: 1.3rem;
        font-weight: 500;
    }
    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 90vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }

    .popup-content {
        background-color: white;
        width: 95%;
        height: 90%;
        overflow: auto;
        padding: 20px;
        border-radius: 5px;
    }

    .close-overlay-btn {
        color: orange;
        border: none;
        background-color: #fcfcfc;
        font-size: 1rem;
    }

    h1 {
        text-align: center;
    }
    
    h2 {
        text-align: center;
    }
</style>
