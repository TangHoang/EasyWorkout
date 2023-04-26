<template>
    <div class="card">
        <div class="card-header">
            <h3>{{exerciseName}}</h3>
            <button @click="deleteCard" class="delete-card-btn delete-btn">Delete</button>
        </div>
        <div class="card-content">
            <!-- think of a cleaner idea to dynamically add sets-->
            <div class="track-grid">
                <div>Set</div>
                <div>Weight</div>
                <div>Reps</div>
                <div></div>
            </div>
            <div v-for="set in this.setArray" :key="num" class="set-row">
                <div>{{ set }}</div>
                <input type="number">
                <input type="number">
                <div></div>
            </div>
        </div>
        <button @click="addSet" class="add-set-btn">add Set</button>

        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                exerciseList: [],  
                setArray: [1],
                num: 1,
            }
        },
        methods: {
            addSet(){
                this.num++;
                console.log(this.num);
                this.setArray.push(this.num);
            },
            chooseExercise(){
                return;
            },
            deleteCard(){
                this.$emit("delete");
                return;
            },
        },
        name: "exerciseCard",
        props: {
            exerciseName: {
                type: String,
                required: true,
            },
            exercisesData: {
                type: Array,
                required: true,
            }
        },
        emits: ["delete"]
    }
</script>

<style scoped>
    @keyframes appearFromLeft {
        0% {
            transform: translateX(50vw);
        }

        100% {
            transform: translateX(0);
        }
    }
    main {
        width: 100%;
    }
    .card {
        width: 90%;
        margin: 15px 0px;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        animation-name: appearFromLeft;
        animation-duration: 0.1s;

    }
    .card-header {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-top: 15px;
    }

    .delete-card-btn {
        background-color: #fcfcfc;
        border-radius: 5px;
        border: none;
        color: orange;
        font-size: 1.1rem;
        font-weight: 500;
    }

    .add-set-btn{
        background-color: #fcfcfc;
        border-radius: 5px;
        border: none;
        color: orange;
        font-size: 1.1rem;
        font-weight: 500;
        margin: 15px 0;
    }

    .track-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        margin-top: 10px;
        justify-items: center;
        align-items: center;
    }

    .set-row{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        justify-items: center;
        align-items: center;
        height: 35px;
    }

    .track-grid div {
        text-align: center;
        font-size: 1rem;
    }

    .set-row div {
        text-align: center;
        font-size: 1rem;
    }

    .set-row input {
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


