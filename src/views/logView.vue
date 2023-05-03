<template>
    <div class="exercise-log">
        <h1> Choose Exercise </h1>
        <input type="text" class="search-input" v-model="searchInput" placeholder="Search">
        <!-- sort these exercises by most logged or recently used -->
        <div class="exercise-item-container">
            <div v-for="exercise in exerciseList" :key="exercise" class="exercise-item" @click="handleSelection"> 
                <div>{{ exercise }}</div>
                <button @click="deleteExerciseItem(exercise)">X</button>
            </div>
        </div> 
    </div>
</template>

<script>
    import App from '../App.vue';
    export default {
        name: "LogView",
        components: App,
        data(){
            return {
                exerciseList: ["hi", "moin", "aloha"],
                searchInput: '',
                showInputField: false,
                newExercise: '',
            }
        },
        methods: {
            deleteExerciseItem(exercise) {
                let index = this.exerciseList.findIndex(item => item == exercise);
                this.exerciseList.splice(index, 1);
            }
        },
        computed: {
            filteredExercises() {
                const searchInput = this.searchInput.toLocaleLowerCase();
                return this.exerciseList.filter(item => item.toLocaleLowerCase().includes(searchInput));
            },
        },
    }
</script>

<style>
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
        border: 1px solid #ffa500;
        background-color: #fcfcfc;
        border-radius: 5px;
        font-size: 1.3rem;
    }

    .orange-btn {
        color: orange;
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

    input::placeholder {
        padding: 5px 10px;
    }
    

</style>
