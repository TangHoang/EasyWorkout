<template>
    <div class="card">
        <div class="card-header">
            <button @click="showComponent = true" class="choose-exercise-btn">Choose Exercise</button>
            <div class="popup-overlay" v-if="showComponent">
                <div class="popup-content" @click.stop>
                    <button @click="showComponent = false" class="close-overlay-btn">Close</button>
                    <chooseExercise/>
                </div>
            </div>  
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
                showComponent: false,
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
            }
        },
    }
</script>

<style scoped>
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
    .choose-exercise-btn {
        background-color: #fcfcfc;
        border-radius: 5px;
        border: none;
        color: orange;
        font-size: 1rem;
    }

    .close-overlay-btn {
        color: orange;
        border: none;
        background-color: #fcfcfc;
        font-size: 1rem;
    }

</style>


