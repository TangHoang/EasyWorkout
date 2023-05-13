<template>
    <div class="history-page" v-if="this.showHistory == false">
        <header class="history-header">
            <h2 class="history-title">History</h2>
        </header>
        <input type="text" class="search-input" v-model="searchInput" placeholder="Search">

        <div class="history-wrapper">
            <div class="history-item" v-for="date in filteredDates">
                <listItem :title="date" @showDetailPage="showHistoryPage" @deleteEntry="deleteHistory(date)"/>
            </div>
        </div>
    </div>
    <template v-if="this.showHistory"> <exerciseLog :fromHistory="true" :logTitle="this.currentDay" :data="this.trainingData.history[this.currentDay]" @back="this.showHistory = false"/></template>
</template>

<script>
    import { useDataStore } from '../stores/data.vue';
    import exerciseLog from '../components/exerciseLog.vue';
    import listItem from '../components/listItem.vue';
    export default {
        name: "HistoryView",
        components: {
            exerciseLog, listItem,
        },
        setup(){
            const trainingData = useDataStore();
            return {trainingData};
        },
        data() {
            return {
                showHistory: false,
                currentDay: "",
                searchInput: '',
                dateList: [],
            }
        },
        methods: {
            showHistoryPage(date) {
                this.currentDay = date;
                this.showHistory = true;
            },
            
            deleteHistory(date) {
                console.log("hi");
                delete this.trainingData.history[date];
                let index = this.dateList.findIndex((item) => item.name == name);
                this.dateList.splice(index, 1);

            }
        },
        computed: {
            filteredDates() {
                const searchInput = this.searchInput.toLocaleLowerCase();
                return this.dateList.filter(item => item.toLocaleLowerCase().includes(searchInput));
            },
        },
        mounted() {
            this.dateList = Object.keys(this.trainingData.history);
        },
        beforeUpdate() {
            this.dateList = Object.keys(this.trainingData.history); 
        },

    }
</script>

<style>

    .history-page{
        min-height: 100%;
        width: 100%;
        max-width: 440px;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        background-color: #fcfcfc;
        border-radius: 10px;
        padding: 0 20px;
    }

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

    .history-wrapper {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 30px;
    }

    .history-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        width: 95%;
        height: 40px;
        font-size: 1.3em;
        vertical-align: middle;
        border-top: 1px solid rgba(0,0,0, 0.2);
    }

    .search-input {
        border: none;
        background-color: rgb(222, 222, 222);
        border-radius: 8px;
        width: 95%;
        height: 25px;
        font-size: 1.3em;
        margin-top: 20px;
    }
</style>
