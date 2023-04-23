<template>
    <body>
        <header>
            <h1> {{ getCurrentDay() }}</h1>
            <h2> {{ getCurrentDatum() }}</h2>
        </header>

        <div id="main-container"></div>  
        <div id="choose-exercise-container">
            <button @click="showComponent = true" class="choose-exercise-btn">Choose Exercise</button>
            <div class="popup-overlay" v-if="showComponent">
                <div class="popup-content" @click.stop>
                    <button @click="showComponent = false" class="close-overlay-btn">Close</button>
                    <chooseExercise @customEvent="insertExercise"/>
                </div>
            </div>  
        </div>
        
    </body>
    
  </template>

<script>
    import {createApp} from "vue";
    import exerciseCard from '../components/exerciseCard.vue';
    import chooseExercise from '../components/chooseExercise.vue';
   
    export default {
        components: {
            exerciseCard,
            chooseExercise,
        },
        data() {
            return {
            // exerciseList: ["Bench Press", "Squat", "Overhead Press", "Deadlift"],
            showComponent: false,
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
            },

            insertExercise(name){
                const newCard = createApp(exerciseCard, {exerciseName: name});
                const mainContainer = document.getElementById("main-container")
                const componentContainer = document.createElement("div")
                componentContainer.setAttribute("class", "component-container");
                mainContainer.appendChild(componentContainer);
                newCard.mount(componentContainer);
                this.showComponent = false;
            }
        }

    }
</script>

<style>
    @import '../assets/base.css';

    * {
        color: rgb(69, 69, 69);
    }
    body{
        min-height: 100%;
        width: 100vw;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    header {
        margin-top: 15px;
    }

    #main-container {
        width: 95%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    .component-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    #choose-exercise-container {
        margin-top: 10px;
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
