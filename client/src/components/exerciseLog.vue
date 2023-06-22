<template>
    <body>
        <header>
            <button class="back-btn" @click="handleBack">Back</button>
            <h1>{{ this.logTitle }}</h1>
        </header>
        <div class="logCard-wrapper" v-for="(array, date) in this.data">
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
                if(this.fromHistory == true && this.trainingData.history[this.logTitle][prop] !== undefined) {
                    delete this.trainingData.history[this.logTitle][prop];
                    delete this.trainingData.data[prop][this.logTitle];
                    return;
                }
                delete this.trainingData.data[this.logTitle][prop];
                delete this.trainingData.history[prop][this.logTitle];
            }
        },
    }
</script>

<style scoped>

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
    .logCard-wrapper {
        width: 81%;
    }
    
</style>