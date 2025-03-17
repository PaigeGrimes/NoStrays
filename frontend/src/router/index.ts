import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Donate from "../views/Donate.vue";
import Login from '../views/login.vue'
import Messages from '../views/Messsages.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/donation', component: Donate },
    { path: '/login', component: Login },
    { path: '/messages', component: Messages }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
