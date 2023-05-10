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
                <choose-exercise :currentDatum="currentDatum" @insert="insertExercise"/>
            </div>
        </div>
        <div class="footer-simulator" @click="showComponent = false"></div>
    </body>
</template>

<script>
    import ExerciseCard from '../components/exerciseCard.vue';
    import ChooseExercise from '../components/chooseExercise.vue';
    import { useDataStore } from '../stores/data.vue';
   
    export default{
        components: {
            ExerciseCard,
            ChooseExercise,
        },
        setup(){
            const trainingData = useDataStore();
            return {trainingData};
        }, 
        data() {
            return {
                showComponent: false,
                exercisesData: [],
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
                this.trainingData.currentExercises.push({name: name, sets: [{set: 1}]});
                this.showComponent = false;
            },
            deleteCard(name) {
                let index = this.exercisesData.findIndex((item) => item.name == name);
                this.trainingData.currentExercises.splice(index, 1);
            },
            saveData(){
                
                return;
            }
        },
        beforeUpdate() {
            this.exercisesData = this.trainingData.currentExercises;
            console.log(this.exercisesData);
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
        color: var(--vt-c-blue);
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

    .footer-simulator {
        position: fixed;
        width: 100%;
        height: 60px;
        bottom: 0;
        left: 0;
        justify-self: end;
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
        color: var(--vt-c-blue);
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
       
        width: 100%;
        max-width: 440px;
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
        color: var(--vt-c-blue);
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
