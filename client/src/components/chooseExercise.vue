<template>
    <div class="choose-exercise-container">       
        <h2> Choose Exercise </h2>
        <input type="text" class="search-input" v-model="searchInput" placeholder="Search">
        <button v-if="showAddButton" @click="showInputField = true; showAddButton = false" class="orange-btn add-exercise-btn">+ Exercise</button>
        <div class="exercise-item-container">
            <div class="add-exercise" v-if="showInputField">
                <input type="text" v-model="newExercise"  class="add-exercise-input">
                <button @click="addExerciseToLog" class="orange-btn add-btn">Add</button>
            </div>
            <div v-for="exercise in filteredExercises" :key="exercise" class="exercise-item" > 
                <div @click="handleSelection(exercise)">{{ exercise }}</div>
                <button @click="deleteExerciseItem(exercise)">X</button>
            </div>
        </div> 
    </div>
</template>

<script>
    import { useDataStore } from '../stores/data.vue';
    export default{
        setup(){
            const trainingData = useDataStore();
            return {trainingData};
        },
        data() {
            return {
                exerciseList: [],
                searchInput: '',
                showInputField: false,
                showAddButton: true,
                newExercise: '',
            }
        },
        methods: {
            handleSelection(exercise) {
                this.$emit("insert", exercise);
                this.trainingData.data[exercise][this.currentDatum] = [{set: 1}];
            },

            addExerciseToLog() {
                console.log(this.exerciseList);
                if(this.exerciseList.includes(this.newExercise) == false){ // could create a popup message saying it already exists
                    //this.exerciseList.unshift(this.newExercise);
                    // init new exercise to global data
                    this.trainingData.data[this.newExercise] = {};
                    this.trainingData.data[this.newExercise][this.currentDatum] = {};
                }
                this.exerciseList = Object.keys(this.trainingData.data);
                this.showInputField = false;
                this.showAddButton = true;
                this.newExercise = '';
            },

            deleteExerciseItem(exercise) {
                let index = this.exerciseList.findIndex(item => item == exercise);
                this.exerciseList.splice(index, 1);
            },
        },
        computed: {
            filteredExercises() {
                const searchInput = this.searchInput.toLocaleLowerCase();
                return this.exerciseList.filter(item => item.toLocaleLowerCase().includes(searchInput));
            },
        },
        async mounted() {
            if(this.trainingData.data == undefined) {
                this.exerciseList = [];
                this.trainingData.data = {};
            } else {
                console.log(this.trainingData.data);
                this.exerciseList = Object.keys(this.trainingData.data);
                //this.exerciseList.shift(); // remove _id property from mongoDB   
            }
                 
        },
        /*
        async beforeUpdate() {
            this.exerciseList = Object.keys(this.trainingData.data);
            this.exerciseList.shift(); // remove _id property from mongoDB
        },
        */
        emits: ["insert"],
        props: {
            currentDatum: {
                type: String,
                required: true,
            }
        }
    }
</script>

<style scoped>
    * {
        color: rgb(69, 69, 69);
    }

    .exercise-log {
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        padding: 10px 20px;
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
        margin-top: 7px;
        border: 1px solid var(--vt-c-blue);
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
        margin-top: 20px;
        margin-bottom: 0;
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
        margin-top: 10px;
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

    
    
</style>