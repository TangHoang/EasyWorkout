<template>
    <footer>
        <div class="wrapper">
            <nav class="navbar">
                <RouterLink to="/history" class="nav-btn history-nav"><img class="history-svg svg" src="./assets/history-svgrepo-com.svg"/>History</RouterLink>
                <RouterLink to="/" class="nav-btn"><img class="home-svg svg" src="./assets/home.svg"/> Home </RouterLink>
                <RouterLink to="/logs" class="nav-btn"><img class="log-svg svg" src="./assets/log28-svgrepo-com.svg"/>Log</RouterLink>
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
    import { RouterLink, RouterView, useRoute } from 'vue-router'  
    import {computed} from 'vue';
    import {useDataStore} from '@/stores/data.vue';

    export default {
        setup() {
            const route =useRoute();
            const path = computed(() => route.path)
            const trainingData = useDataStore();
            return {trainingData, path};
        },
        data() {
            return {
                username: "",
                isLoggedin: false,
                touchendX: 0,
                touchstartX: 0,
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
                        console.log(this.isLoggedin);
                    })
                } catch (err) {
                    console.error('Error making fetch request:', err);
                }
            },
            checkDirection() {
                if ((this.touchendX - this.touchstartX) < -100) { //swipe left
                    if (this.path == "/") this.$router.push("/logs");
                    if (this.path == "/history") this.$router.push("/");
                }
                if ((this.touchendX - this.touchstartX > 100)) { //swipe right
                    if (this.path == "/") this.$router.push("/history");
                    if (this.path == "/logs") this.$router.push("/");
                }
            }
        },
        mounted() {
            // Make a fetch request when the component is mounted
            this.fetchUserData();
            this.fetchTrainingData();
            // swipe support
            document.addEventListener('touchstart', e => {
                this.touchstartX = e.changedTouches[0].screenX
            })

            document.addEventListener('touchend', e => {
                this.touchendX = e.changedTouches[0].screenX
                this.checkDirection()
            })
            
        } 
    }
</script>

<style>
    body{
        display: flex;
        flex-flow: column nowrap;
        height: 100vh;
        width: 100vw;
        max-width: 440px;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        animation-name: appearFromNowhere;
        animation-duration: 0.2s;
        animation-timing-function: ease-in;
        overflow-y: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
    }

    body::-webkit-scrollbar{
        width: 0;
        height: 0;
    }
    
    footer{
        height: 80px;
        width: 100vw;
        max-width: 440px;
        position: fixed;
        margin-left: auto;
        margin-right: auto;
        bottom: 0;
        z-index: 10;
        background-color: #ffffff;
        padding-bottom: 20px;
        box-shadow: 0px 2px 5px rgba(1,1,1,0.2), 0px -2px 5px rgba(1,1,1,0.2);
        /*write box shadow that only is on top of the div*/

    }
    .nav-btn{
        padding: 0 20px;
        color: #1d1d1d;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }
    .wrapper{
        padding-bottom: 15px;
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

    .history-nav {
        padding-top: 2px;
    }

    .svg {
        width: 50px;
        margin-bottom: -9px;
    }

    .history-svg {
        width: 40px;
        margin-bottom: -6px;
    }

    .log-svg {
        width: 47px;
        margin-bottom: -6px;
    }
</style>
