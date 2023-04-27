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
                <exercise-card :exercisesData="this.exercisesData" :exerciseName="exercise.name" v-for="exercise in exercisesData" :key="exercise.name" @delete="deleteCard(exercise.name)"/>
            </keep-alive>
        </div>
        <choose-exercise :showComponent="this.showComponent" @click="showComponent = true" @insert="insertExercise"/>
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
    }

    h1 {
        text-align: center;
        font-weight: 700;
    }
    
    h2 {
        text-align: center;
        font-weight: 600;
    }
</style>
