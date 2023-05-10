<script>
    import { RouterLink, RouterView } from 'vue-router'  
    import {useDataStore} from '@/stores/data.vue';

    export default {
        setup() {
            const trainingData = useDataStore();
        },
    }
    // I should probably define the data structure of my data here, pass it down to all props and use emits to update everything.
</script>

<template>
    <footer>
        <div class="wrapper">
            <nav class="navbar">
                <RouterLink to="/calendar" class="nav-btn">Calendar</RouterLink>
                <RouterLink to="/" class="nav-btn">Home</RouterLink>
                <RouterLink to="/logs" class="nav-btn">Log</RouterLink>
            </nav>
        </div>
    </footer>
    <!-- exclude is not working yet-->
    <router-view v-slot="{ Component }">
        <keep-alive exclude="CalenderView, LogView"> 
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<style>
    body{
        display: flex;
        flex-flow: column nowrap;
        min-height: 100%;
        height: 100vh;
        width: 100vw;
        max-width: 440px;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        border-radius: 10px;
    }
    footer{
        height: 60px;
        width: 100vw;
        max-width: 440px;
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
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
