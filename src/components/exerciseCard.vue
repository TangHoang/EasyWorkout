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

    .add-set-btn{
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


