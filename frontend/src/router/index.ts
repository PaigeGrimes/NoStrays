import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Donate from "../views/Donate.vue";
import Login from '../views/login.vue'
import Messages from '../views/Messsages.vue'
import Announcements from "@/views/Announcements.vue";
import Caregiver from "@/views/Caregiver.vue";
import Volunteer from "@/views/Volunteer.vue";
import AdminPanel from "@/views/AdminPanel.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/login', component: Login },
    { path: '/messages', component: Messages },
    { path: '/donation', component: Donate },
    { path: '/admin', component: AdminPanel, meta: { requiresAuth: true, adminOnly: true } },
    { path: '/announcements', component: Announcements, meta: { requiresAuth: true } },
    { path: '/caregiver', component: Caregiver, meta: { requiresAuth: true } },
    { path: '/volunteer', component: Volunteer, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
