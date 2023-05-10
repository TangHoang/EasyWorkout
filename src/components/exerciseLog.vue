<template>
    <body>
        <header>
            <button class="back-btn" @click="handleBack">Back</button>
            <h1>{{ this.exerciseName }}</h1>
        </header>
        <div class="log-wrapper" v-for="(array, date) in trainingData.data[this.exerciseName].sets">
                <div class="log-card">
                    <div class="card-header">
                        <div>{{ date }}</div>
                        <button @click="deleteEntry" class="orange-btn">X</button>
                    </div>
                    <div class="log-container">
                        <div class="title-set">Set</div>
                        <div class="title-weight">weight</div>
                        <div class="title-reps">Reps</div>
                        <template v-for="object in array ">
                                <div>{{ object.set }}</div>
                                <div>{{ object.weight }}kg</div>
                                <div>{{ object.reps }}</div>
                        </template>
                    </div>
                </div>
            </div>
    </body>
    
</template>

<script>
    import { useDataStore } from '../stores/data.vue';
    export default {
        setup() {
            const trainingData = useDataStore();
            return {trainingData};
        },
        data() {
            return{
                hi: 1,
                
            }
        },
        props: {
            exerciseName: {
                type: String,
                required: true,
            }
        },
        methods: {
            handleBack() {
                this.$emit("back");
            }
        },
    }
</script>

<style scoped>

    body {
        height: 100vh;
        width: 100vw;
    }

    header {
        display: flex;
        flex-flow: column nowrap;
    }

    .back-btn {
        background: none;
        border: none;
        color: var(--vt-c-blue);
        margin-right: auto;
        margin-left: 30px;
        margin-top: 10px;
        font-size: 1.1rem;
    }
    .log-wrapper {
        width: 81%;
    }
    
    .log-card {
        border: 1px solid rgba(0, 0, 0, 0.05);
        background-color: #f9f9f9;
        margin: 15px 0px;
        padding: 10px 20px;
    }

    .card-header {
        display: grid;   
        grid-template-columns: 1fr 1fr 1fr ;    
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .card-header div {
        grid-column: 2/2;
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
    }

    .card-header button {
        grid-column: 3/3;
        border: none;
        background-color: #f9f9f9;
        color: red;
        font-size: 1.3rem;
    }

    .log-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        padding-top: 10px;
    }

    .log-container div {
        text-align: center;
    }

    .title-set {
        grid-row: 1/1;
        grid-column: 1/1;
    }

    .title-weight {
        grid-row: 1/1;
        grid-column: 2/2;
    }

    .title-reps {
        grid-row: 1/1;
        grid-column: 3/3;
    }

</style>