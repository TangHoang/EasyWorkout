<template>
    <body>
        <header>
            <!-- computed prop-->
            <div class="container">
                <h2> {{ currentDatum }}</h2>
                <button @click="saveData" class="finish-btn">Finish</button>
            </div>
            <h3> {{ currentDay }}</h3>
        </header>

        <div class="main-container">
            <keep-alive>
                <exercise-card :currentDatum="currentDatum" :exercisesData="this.exercisesData" :exerciseName="exercise.name" v-for="exercise in exercisesData" :key="exercise.name" @delete="deleteCard(exercise.name)"/>
            </keep-alive>
        </div>
        <button @click="showComponent = true" class="choose-exercise-btn">Choose Exercise</button>
        <div class="popup-overlay" v-if="showComponent">
            <div class="popup-content" @click.stop>
                <button @click="this.showComponent = false" class="close-overlay-btn">Close</button>
                <choose-exercise @click="showComponent = false" @insert="insertExercise"/>
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
                    {name: "Squat", sets: [{set: 1}]}
                    ],
                mockupData: [{name: "bla", data: [{set: 1, kg: 10, reps: 10}, {set: 1, kg: 10, reps: 9}]}]
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
                this.exercisesData.push({name: name, sets: [{set: 1}]});
                this.showComponent = false;
            },
            deleteCard(name) {
                let index = this.exercisesData.findIndex((item) => item.name == name);
                this.exercisesData.splice(index, 1);
            },
            saveData(){
                
                return;
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
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
        width: 100%;
    }

    .container{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
    }

    h2{
        grid-column: 2/2;
    }

    .finish-btn{
        grid-column: 3/3;
        background-color: #fcfcfc;
        border-radius: 5px;
        border: none;
        color: orange;
        font-size: 1.3rem;
        font-weight: 500;
    }

    .main-container {
        width: 90%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        margin-top: 30px;
    }

    .component-container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 30px;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .choose-exercise-btn {
        background-color: #fcfcfc;
        border-radius: 5px;
        border: none;
        color: orange;
        font-size: 1.3rem;
        font-weight: 500;
        margin-bottom: 300px;
    }

    h1 {
        text-align: center;
        font-weight: 700;
    }
    
    h2 {
        text-align: center;
        font-weight: 600;
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
        border-radius: 10px;
        animation-name: appearFromBelow;
        animation-duration: .4s;
    }

    .close-overlay-btn {
        color: orange;
        border: none;
        background-color: #fcfcfc;
        font-size: 1rem;
    }

    @keyframes appearFromBelow{
        0% {
            transform: translateY(100vh);
        }
        100% {
            transform: translateY(0);
        }

    }
</style>
