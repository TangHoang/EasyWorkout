<template>
    <body> 
        <div class="start-container" v-if="this.showBody == false">
            <div class="header">
                <div class="blank logo-animation"></div>
                <h1 class="h1-title">EasyWorkout</h1>
                <img class="logo-animation" src="../assets/muscle-animation.svg"/>
            </div>
            <div class="login-wrapper" v-if="this.isLoggedin == false">
                <button class="google-btn waves"><a class="google-link" href="/auth/google">Login with Google</a></button>
                <div class="or-text"> or </div>
                <button class="begin-btn" @click="begin">Begin Demo</button>
            </div>
            <div class="login-wrapper" v-if="this.isLoggedin">
                <h3 class="hey-msg">HEY {{ this.username }}</h3>
                <button class="waves begin-btn" @click="begin">Let's Go!</button>
            </div>
        </div>
        
        <div class="main-container" v-if="this.showBody">
            <header>
                <!-- computed prop-->
                <div class="container">
                    <h2> {{ currentDatum }}</h2>
                    <button @click="saveData" class="finish-btn">Finish</button>
                </div>
                <h3> {{ currentDay }}</h3>
                <stopwatch v-if="this.showBody" :showBody="this.showBody"/>
            </header>

            <div class="card-container">
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
    </body>
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
            let dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
            const date = dateFormat.format(Date.now());
            return date;
            },
        },
        methods: {
            insertExercise(name) {
                this.trainingData.currentExercises.push({name: name, sets: [{set: 1}]});
                console.log(this.trainingData.history);
                if(this.trainingData.history == undefined) {
                    this.trainingData.history = {};
                    this.trainingData.history[this.currentDatum] = {};
                };
                this.showComponent = false;
            },
            deleteCard(name) {
                let index = this.exercisesData.findIndex((item) => item.name == name);
                this.trainingData.currentExercises.splice(index, 1);
            },
            async saveData(){
                let mappedObject = {
                    data: this.trainingData.data,
                    currentExercises: this.trainingData.currentExercises,
                    history: this.trainingData.history,
                };
                // handle on client
                this.showBody = false;
                // handle fetch
                console.log(JSON.stringify(mappedObject));
                try{
                    await fetch("/api/post", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(mappedObject),
                    })
                    .then(response => {
                        if(response.ok){
                            console.log("Data posted successfully");
                        }else {
                            throw new Error(response.statusText);
                        }
                    })
                }catch(err) {
                    console.error("Error posting data:", err);
                } 
                
            },
            begin() {
                this.showBody = true;
                this.trainingData.currentExercises = [];
            },
        },
        props: {
            username: {
                type: String,
                required: false,
            },
            isLoggedin: {
                type: Boolean,
                required: false,
            },
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
        width: 90%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        margin-top: 30px;
    }

    .start-container {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        width: 100%;
        max-width: 440px;
        min-height: 100dvh;
        background-color: #ffffff;
        animation-name: appearFromNowhere;
        animation-duration: 0.4s;
        animation-timing-function: ease-out;
    }

    .start-container .header {
        margin-bottom: 5vh;
        margin-top: 1vh;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }

    .start-container .header h1 {
        color: var(--vt-c-blue);
        margin-right: 1vh;
    }

    .start-container .begin-btn {
        background-color: var(--vt-c-blue);
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        color: #ffffff;
        font-size: 2.5vh;
        width: 50vw;
        max-width: 300px;
    }

    .login-wrapper {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        width: 100%;
        max-width: 440px;
        min-height: 100dvh;
        background-color: #ffffff;
    }

    .h1-title {
        text-align: center;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
    }
    header {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        margin: 15px 0;
        width: 100%;
    }

    .container{
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        width: 100%;
        align-items: center;
    }

    h2{
        grid-column: 2/2;
    }

    .or-text {
        margin: 10px 0;
    }

    .finish-btn{
        grid-column: 3/3;
        background-color: #ffffff;
        border-radius: 5px;
        border: none;
        color: var(--vt-c-blue);
        font-size: 1.3rem;
        font-weight: 500;
    }

    .hey-msg {
        padding-bottom: 20px;
    }
    
    .google-btn {
        background-color: #ffffff;
        border: 1px solid var(--vt-c-blue);
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 2.2vh;
        margin-top: 5vw;
        width: 50vw;
        max-width: 300px;
    }

    .google-btn:hover {
        background-color: var(--vt-c-blue);
        color: #ffffff;
    }
    .google-link {
        color: black;
        text-decoration: none;
    }

    .main-container {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        width: 100%;
        max-width: 440px;
        min-height: 100dvh;
        background-color: #ffffff;
        border-radius: 5px;
        animation-name: appearFromNowhere;
        animation-duration: 0.4s;
        animation-timing-function: ease-out;
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
        background-color: #ffffff;
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
        animation-name: appearFromNowhere;
        animation-duration: 0.5s;
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
        background-color: #ffffff;
        font-size: 1rem;
    }

    .logo-animation {
        width: 10vh;
        height: 13vh;
        max-width: 50px;
    }

    @keyframes appearFromBelow{
        0% {
            transform: translateY(100vh);
        }
        100% {
            transform: translateY(0);
        }

    }

    @keyframes appearFromNowhere{
        from {opacity: 0;}
        to {opacity: 1;}
    }
</style>
