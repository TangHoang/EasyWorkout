<template>
    <body v-if="this.showHistory == false">
        <header class="history-header">
            <h2 class="history-title">History</h2>
        </header>
        <input type="text" class="search-input" v-model="searchInput" placeholder="Search">

        <div class="history-wrapper">
            <template v-for="date in filteredDates">
                <div class="history-item" @click="handleClick(date)">{{ date }}</div>
            </template>
        </div>
    </body>
    <template v-if="this.showHistory"> <exerciseLog :fromHistory="true" :logTitle="this.currentDay" :data="this.trainingData.history[this.currentDay]" @back="this.showHistory = false"/></template>
</template>

<script>
    import { useDataStore } from '../stores/data.vue';
    import exerciseLog from '../components/exerciseLog.vue';
    export default {
        name: "HistoryView",
        components: {
            exerciseLog,
        },
        setup(){
            const trainingData = useDataStore();
            return {trainingData};
        },
        data() {
            return {
                showHistory: false,
                currentDay: "",
                searchInput: "",
                dateList: [],
            }
        },
        methods: {
            handleClick(date) {
                this.currentDay = date;
                this.showHistory = true;
            }
        },
        computed: {
            filteredDates() {
                const searchInput = this.searchInput.toLocaleLowerCase();
                return this.dateList.filter(item => item.toLocaleLowerCase().includes(searchInput));
            },
        },
        beforeUpdate() {
            this.dateList = Object.keys(this.trainingData.history); 
        }

    }
</script>

<style>
    .history-header {
        margin-top: 15px;
    }

    .specific-history-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        min-height: 100vh;
        max-width: 440px;
        background-color: #fcfcfc;
        z-index: 20;
    }
</style>
