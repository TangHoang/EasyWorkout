<template>
    <div class="start-container" v-if="this.showBody == false">
        <h1>Easyworkout</h1>
        <button class="begin-btn" @click="begin">Begin</button>
    </div>
    <div class="card-container" v-if="this.showBody">
        <header>
            <!-- computed prop-->
            <div class="container">
                <h2> {{ currentDatum }}</h2>
                <button @click="saveData" class="finish-btn">Finish</button>
            </div>
            <h3> {{ currentDay }}</h3>
            <stopwatch v-if="this.showBody" :showBody="this.showBody"/>
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
    </div>
</template>

<script>
    import ExerciseCard from '../components/exerciseCard.vue';
    import ChooseExercise from '../components/chooseExercise.vue';
    import stopwatch from '../components/stopwatch.vue';
    import { useDataStore } from '../stores/data.vue';
   
    export default{
        components: {
            ExerciseCard,
            ChooseExercise,
            stopwatch,
        },
        setup(){
            const trainingData = useDataStore();
            return {trainingData};
        }, 
        data() {
            return {
                showComponent: false,
                exercisesData: [],
                showBody: false,
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
            // let datum = date.toLocaleDateString("de-DE", {dateStyle: "medium"});
            let datum = date.toLocaleString("de-DE",{year: "2-digit",month: "long", day: "numeric",});
            return datum;
            },
        },
        methods: {
            insertExercise(name) {
                this.trainingData.currentExercises.push({name: name, sets: [{set: 1}]});
                if(this.trainingData.history[this.currentDatum] == undefined) {
                    this.trainingData.history[this.currentDatum] = {};
                };
                this.showComponent = false;
            },
            deleteCard(name) {
                let index = this.exercisesData.findIndex((item) => item.name == name);
                this.trainingData.currentExercises.splice(index, 1);
            },
            async saveData(){
                // handle fetch
                fetch("https://easyworkout-production.up.railway.app/data/post", {
                    mode: "cors",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Origin": "http://localhost:3000",

                    },
                    body: JSON.stringify(this.trainingData),
                })
                .then(response => {
                    if(response.ok){
                        console.log("Data posted successfully");
                    }else {
                        throw new Error(response.statusText);
                    }
                })
                .catch(err => console.error("Error posting data:", err));
                
                // handle on client
                this.showBody = false;
                console.log(this.showBody);

            },
            begin() {
                this.showBody = true;
                this.trainingData.currentExercises = [];
            }
            
        },
        beforeUpdate() {
            this.exercisesData = this.trainingData.currentExercises;
        }
    }
</script>

<style>
    @import '../assets/base.css';

    * {
        color: rgb(69, 69, 69);
    }

    .card-container {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        width: 100%;
        max-width: 440px;
        min-height: 97vh;
        background-color: #fcfcfc;
        border-radius: 5px;
    }

    .start-container {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        width: 100%;
        max-width: 440px;
        min-height: 97vh;
        background-color: #fcfcfc;
        border-radius: 5px;
    }

    .start-container h1 {
        margin-top: 10px;
        color: var(--vt-c-blue);
    }

    .start-container button {
        background-color: var(--vt-c-blue);
        padding: 10px 20px;
        margin-top: 3vw;
        border: none;
        border-radius: 5px;
        color: #fcfcfc;
        font-size: 2.5vh;
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
        align-items: center;
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
        margin-bottom: 200px;
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
