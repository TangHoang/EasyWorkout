<template>
    <div v-if="showLog == false" class="exercise-log">
        <h2> Logs </h2>
        <input type="text" class="search-input" v-model="searchInput" placeholder="Search">
        <!-- sort these exercises by most logged or recently used -->
        <div class="exercise-item-container">
            <div v-for="exercise in exerciseList" :key="exercise" class="exercise-item" @click="handleSelection"> 
                <!--  <exerciseLog :exerciseName="exercise" />  -->
                <div @click="handleClick(exercise)"> {{ exercise }}</div>
                <button @click="deleteExerciseItem(exercise)">X</button>
            </div>
        </div> 
    </div>
    <div v-if="showLog"> <exerciseLog :exerciseName="this.currentExercise" @back="this.showLog = false"/> </div>
    
</template>

<script>
    import exerciseLog from '../components/exerciseLog.vue';
    import { useDataStore } from '../stores/data.vue';
    export default {
        name: "LogView",
        components: {exerciseLog,},
        setup() {
            const trainingData = useDataStore();
            return {trainingData};
        },
        data(){
            return {
                exerciseList: [],
                searchInput: '',
                showInputField: false,
                newExercise: '',
                showLog: false,
                currentExercise: ''
            }
        },
        methods: {
            deleteExerciseItem(exercise) {
                let index = this.exerciseList.findIndex(item => item == exercise);
                this.exerciseList.splice(index, 1);
            },
            handleClick(currentExercise) {
                this.showLog = true;
                this.currentExercise = currentExercise;
            }
        },
        computed: {
            filteredExercises() {
                const searchInput = this.searchInput.toLocaleLowerCase();
                return this.exerciseList.filter(item => item.toLocaleLowerCase().includes(searchInput));
            },
        },
        mounted() {
            this.exerciseList = Object.keys(this.trainingData.data);
        }
    }
</script>

<style>
    .exercise-log {
        min-height: 100%;
        width: 100%;
        max-width: 440px;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        padding: 10px 20px;
        background-color: #fcfcfc;
        border-radius: 10px;
    }

    .add-exercise {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        justify-content: space-between;
        align-items: space-between;
        margin-bottom: 10px;
    }
    .search-input {
        border: none;
        background-color: rgb(222, 222, 222);
        border-radius: 8px;
        width: 95%;
        height: 25px;
        font-size: 1.3em;
        margin-top: 20px;
    }

    .add-exercise-input {
        width: 82%;
        height: 30px;
        margin-right: auto;
        margin-left: 10px;
        border: 1px solid #ffa500;
        background-color: #fcfcfc;
        border-radius: 5px;
        font-size: 1.3rem;
    }

    .orange-btn {
        color: var(--vt-c-blue);
        border: none;
        background-color: #fcfcfc;
    }

    .add-exercise-btn{
        font-size: 1.3rem;
        margin: 20px 0;
    }

    .add-btn {
        font-size: 1.2rem;
    }
    .exercise-item-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        margin-top: 30px;
    }

    .exercise-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        width: 95%;
        height: 40px;
        font-size: 1.3em;
        vertical-align: middle;
        border-top: 1px solid rgba(0,0,0, 0.2);
    }

    .exercise-item button {
        border: none;
        background-color: #fcfcfc;
        color: red;
        font-size: 1.3rem;
        padding-right: 15px;
    }

    .exercise-item div {
        width: 90%;
    }

    input::placeholder {
        padding: 5px 10px;
    }
    
    h2 {
        font-weight: 600;
        margin-top: 10px;
    }

    .exercise-log-router {
        font-size: 1.1rem;
        text-decoration: none;
        width: 90%;
    }

</style>
