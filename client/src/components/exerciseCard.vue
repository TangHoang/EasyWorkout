<template>
    <div class="card">
        <div class="card-header">
            <h3>{{ exerciseName }}</h3>
            <button @click="deleteCard" class="delete-card-btn delete-btn">Delete</button>
        </div>
        <div class="card-content">
            <div class="track-grid">
                <div>Set</div>
                <div>Weight</div>
                <div>Reps</div>
                <div></div>
            </div>
            <div v-for="set in this.trainingData.data[this.exerciseName][this.currentDatum]" :key="exercisesData" class="set-table">
                <div>{{ set.set }}</div>
                <input type="number" class="kg-input" v-model="set.weight">
                <input type="number" class="rep-input" v-model="set.reps">
                <div></div>
            </div>
        </div>
        <button @click="addSet" class="add-set-btn">+ Set</button>
    </div>
</template>

<script>
    import { useDataStore } from '../stores/data.vue';
    export default {
        setup() {
            const trainingData = useDataStore();
            return {trainingData};
        },
        data() {
            return {
                num: 1,
            }
        },
        methods: {
            addSet(){
                this.num++;
                this.trainingData.data[this.exerciseName][this.currentDatum].push({set: this.num});
                this.trainingData.history[this.currentDatum][this.exerciseName] = this.trainingData.data[this.exerciseName][this.currentDatum];
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
            },
            currentDatum: {
                type: String,
                required: true,
            }
        },
        emits: ["delete"],
    }
</script>

<style scoped>
    main {
        width: 100%;
    }
    .card {
        width: 90%;
        margin: 15px 0px;
        border: 1px solid rgba(0, 0, 0, 0.05);
        background-color: #f9f9f9;
        border-radius: 10px;

    }
    .card-header {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-top: 15px;
        padding: 0 20px;
    }

    h3 {
        font-weight: 600;
    }

    .delete-card-btn {
        background-color: #f9f9f9;
        border-radius: 5px;
        border: none;
        color: var(--vt-c-blue);
        font-size: 1.1rem;
        font-weight: 500;
    }

    .add-set-btn{
        background-color: #f9f9f9;
        border-radius: 5px;
        border: none;
        color: var(--vt-c-blue);
        font-size: 1.1rem;
        font-weight: 500;
        margin: 15px 0;
        padding: 0 20px;
    }

    .track-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        margin-top: 10px;
        justify-items: center;
        align-items: center;
    }

    .set-table{
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
        font-weight: 500;
    }

    .set-table div {
        text-align: center;
        font-size: 1rem;
    }

    .set-table input {
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: #fcfcfc;
        border-radius: 8px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        width: 90%;
        font-size: 1rem;
        margin: 10px 0;
        align-self: center;
        text-align: center;
    }

</style>


