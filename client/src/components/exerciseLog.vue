<template>
    <body>
        <header>
            <button class="back-btn" @click="handleBack">Back</button>
            <h1>{{ this.logTitle }}</h1>
        </header>
        <div class="log-wrapper" v-for="(array, date) in this.data">
            <logCard :title="date" :array="array" @deleteEntry="deleteEntry"/>
        </div>
    </body>
    
</template>

<script>
    import { useDataStore } from '../stores/data.vue';
    import logCard from './logCard.vue';
    export default {
        components: {
            logCard,
        },
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
            logTitle: {
                type: String,
                required: true,
            },
            data: {
                type: Object,
                required: true,
            },
            fromHistory: {
                type: Boolean,
                required: true,
            }
        },
        methods: {
            handleBack() {
                this.$emit("back");
            },
            deleteEntry(prop) {
                console.log(this.trainingData.data[this.exerciseName]);
                if(this.fromHistory == true && this.trainingData.history[this.logTitle][prop] !== undefined) {
                    delete this.trainingData.history[this.logTitle][prop];
                    return;
                }
                delete this.trainingData.data[this.logTitle][prop];
            }
        },
    }
</script>

<style scoped>

    body {
        height: 100vh;
        width: 100vw;
        border-radius: 10px;
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
    
</style>