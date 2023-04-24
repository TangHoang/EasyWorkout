<template>
    <div class="card">
        <div class="card-header">
            <h3>{{exerciseName}}</h3>
            <button @click="deleteCard" id="delete-card-1" class="delete-card-btn delete-btn">Delete</button>
        </div>
        <div class="card-content">
            <!-- think of a cleaner idea to dynamically add sets-->
            <div class="track-grid">
                <div>Set</div>
                <div>Weight</div>
                <div>Reps</div>
                <div></div>
                <div>1</div>
                <input type="number">
                <input type="number">
                <div></div>
            </div>
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

    .delete-card-btn {
        background-color: #fcfcfc;
        border-radius: 5px;
        border: none;
        color: orange;
        font-size: 1.1rem;
        font-weight: 500;
    }

    .track-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        margin-top: 10px;
        justify-items: center;
        align-items: center;
    }

    .track-grid div {
        text-align: center;
        font-size: 1rem;
    }

    .track-grid input {
        border: none;
        background-color: rgb(222, 222, 222);
        border-radius: 8px;
        width: 90%;
        font-size: 1rem;
        margin: 10px 0;
        align-self: center;
        text-align: center;
    }

</style>


