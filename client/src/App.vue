<template>
    <footer>
        <div class="wrapper">
            <nav class="navbar">
                <RouterLink to="/history" class="nav-btn">History</RouterLink>
                <RouterLink to="/" class="nav-btn">Home</RouterLink>
                <RouterLink to="/logs" class="nav-btn">Log</RouterLink>
            </nav>
        </div>
    </footer>
    <!-- exclude is not working yet-->
    <router-view v-slot="{ Component }">
        <keep-alive exclude="HistoryView, LogView"> 
            <component :is="Component" :username="this.username" :isLoggedin="this.isLoggedin"/>
        </keep-alive>
    </router-view>
</template>

<script>
    import { RouterLink, RouterView } from 'vue-router'  
    import {useDataStore} from '@/stores/data.vue';
    import {useUserStore} from '@/stores/userStore.vue';

    export default {
        setup() {
            const trainingData = useDataStore();
            return {trainingData};
        },
        data() {
            return {
                username: "",
                isLoggedin: false,
            }
        },
        methods: {
            async fetchTrainingData() {
                try {
                    fetch('/api/get', {
                        method: "GET",
                    })
                    .then(response => (response.json()))
                    .then(data => {
                        console.log('Fetch request succeeded:', data);
                        if(data == undefined) {
                            data.data = {};
                            data.history = {};
                            data.currentExercises = [];
                        }
                        this.trainingData.data = data.data;
                        this.trainingData.history = data.history;
                        this.trainingData.currentExercises = data.currentExercises;
                        console.log(this.trainingData.history);
                    })
                } catch (err) {
                    console.error('Error making fetch request:', err);
                }   
            },
            async fetchUserData() {
                try {
                    fetch('/auth/users', {
                        method: "GET",
                    })
                    .then(response => (response.json()))
                    .then(user => {
                        console.log('Fetch request succeeded:', user);
                        this.username = user.name;
                        this.isLoggedin = true;
                    })
                } catch (err) {
                    console.error('Error making fetch request:', err);
                }
            }
        },
        mounted() {
            // Make a fetch request when the component is mounted
            this.fetchUserData();
            if(this.isLoggedin) {
                this.fetchTrainingData();
            }
        } 
    }
</script>

<style>
    body{
        display: flex;
        flex-flow: column nowrap;
        width: 100vw;
        max-width: 440px;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }
    footer{
        height: 60px;
        width: 100vw;
        max-width: 440px;
        /*
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        */
        position: fixed;
        margin-left: auto;
        margin-right: auto;
        bottom: 0;
        z-index: 10;
        background-color: #fcfcfc;
    }
    .nav-btn{
        padding: 10px 20px;
        color: var(--vt-c-blue);
    }
    .wrapper{
        padding: 15px;
    }
    .navbar{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }

    .navbar a{
        width: 33%;
        text-align: center;
    }
</style>
