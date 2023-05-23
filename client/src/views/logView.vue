<template>
    <div v-if="showLog == false" class="exercise-log">
        <h2 class="log-header"> Logs </h2>
        <input type="text" class="search-input" v-model="searchInput" placeholder="Search">
        <!-- sort these exercises by most logged or recently used -->
        <div class="exercise-item-container">
            <div v-for="exercise in filteredExercises" :key="exercise" class="exercise-item" @click="handleSelection"> 
                <!--  make each exercise a component to be able to use the showConfirm idea -->
                <listItem :title="exercise" @deleteEntry="deleteLog" @showDetailPage="showLogPage"/>
            </div>
        </div> 
    </div>
    <template v-if="showLog"> <exerciseLog :fromHistory="false" :logTitle="this.currentExercise" :data="this.trainingData.data[this.currentExercise]" @back="this.showLog = false"/> </template>
    
</template>

<script>
    import exerciseLog from '../components/exerciseLog.vue';
    import listItem from '../components/listItem.vue';
    import { useDataStore } from '../stores/data.vue';
    export default {
        name: "LogView",
        components: {exerciseLog, listItem},
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
            showLogPage(currentExercise) {
                this.currentExercise = currentExercise;
                this.showLog = true;
            },
            deleteLog(exercise) {
                let index1 = this.exerciseList.findIndex(item => item == exercise);
                let index2 = this.trainingData.currentExercises.findIndex(item => item.name == exercise);
                this.trainingData.currentExercises.splice(index2, 1);
                this.exerciseList.splice(index1, 1);
                delete this.trainingData.data[exercise];
            },
        },
        computed: {
            filteredExercises() {
                const searchInput = this.searchInput.toLocaleLowerCase();
                return this.exerciseList.filter(item => item.toLocaleLowerCase().includes(searchInput));
            },
        },
        mounted() {
            // this.exerciseList = ((fetch data))
            this.exerciseList = Object.keys(this.trainingData.data);
        },
        beforeUpdate() {
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
        background-color: #fcfcfc;
        border-radius: 10px;
        padding: 0 20px;
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

    .warning-msg {
        font-size: 0.7rem;
        color: red;
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

    .exercise-item div {
        width: 90%;
    }

    input::placeholder {
        padding: 5px 10px;
    }
    
    .log-header {
        font-weight: 600;
        margin-top: 15px;
    }

    .exercise-log-router {
        font-size: 1.1rem;
        text-decoration: none;
        width: 90%;
    }

</style>
