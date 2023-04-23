<template>
    <div class="card">
        <div class="card-header">
            <h3>{{exerciseName}}</h3>
            <button @click="deleteCard" id="delete-card-1" class="delete-card-btn delete-btn">X</button>
        </div>
        <div class="card-content">

        </div>

        
    </div>
</template>

<script>
    import chooseExercise from './chooseExercise.vue';

    export default {
        data() {
            return {
                exerciseList: [],  
            }
        },
        components: {
            chooseExercise,
        },
        methods: {
            chooseExercise(){
                return;
            },
            deleteCard(event){
                return;
            },
        },
        name: "exerciseCard",
        props: {
            exerciseName: {
                type: String,
                required: true,
            }
        }
    }
</script>

<style scoped>
    main {
        width: 100%;
    }
    .card {
        width: 90%;
    }
    .card-header {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

    }

</style>


