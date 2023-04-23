import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/exercise-log',
        name: 'exercise-log',
        component: () => import('../views/logView.vue')
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../views/calendarView.vue')
    },
    ]
})

export default router
