<template>
    <div id="choose-exercise-container">
        <h1> Choose Exercise </h1>
        <input type="text" v-model="searchInput" placeholder="Search">
        <!-- sort these exercises by most logged or recently used -->
        <div id="exercise-item-container">
            <div v-for="exercise in filteredExercises" :id="exercise" class="exercise-item" @click="handleSelection"> {{ exercise }}</div>
        </div> 
    </div>
</template>

<script>
    export default{
        data() {
            return {
                exerciseList: [],
                searchInput: '',
            }
        },
        methods: {
            async fetchExerciseList() {
                try {
                    // const response = await fetch('');
                    // const data = await response.json();
                    const data = ["Bench Press", "Overhead Press", "Dips", "Squat", "Deadlift", "Romanian Deadlift", "Pull Up"];
                    this.exerciseList = data;
                }
                catch(error){
                    console.error(error);
                }
            },
            handleSelection() {
                this.$emit("customEvent", exercise);
            }
        },
        computed: {
            filteredExercises() {
                const searchInput = this.searchInput.toLocaleLowerCase();
                return this.exerciseList.filter(item => item.toLocaleLowerCase().includes(searchInput));
            },
        },
        async mounted() {
            await this.fetchExerciseList();
        }
    }
</script>

<style scoped>
    * {
        color: rgb(69, 69, 69);
    }

    #choose-exercise-container {
        min-height: 90%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        margin-top: 20px;
    }

    input {
        border: none;
        background-color: rgb(212, 212, 212);
        border-radius: 8px;
        width: 90%;
        height: 25px;
        font-size: 1.3em;
        margin-top: 10px;
    }

    #exercise-item-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        margin-top: 20px;
    }

    .exercise-item {
        display: flex;
        align-items: center;
        text-align: left;
        width: 90%;
        height: 40px;
        font-size: 1.3em;
        vertical-align: middle;
        border-top: 1px solid rgba(0,0,0, 0.2);
    }

    

    input::placeholder {
        padding: 5px 10px;
    }

    
</style>