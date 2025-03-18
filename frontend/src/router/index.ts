import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/About.vue'
import Donate from "../views/Donate.vue";
import Login from '../views/Login.vue'
import Messages from '../views/Messsages.vue'
import Admin from '../views/Admin.vue';
import Signup from "@/views/Signup.vue";
import Volunteer from "@/views/Volunteer.vue";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/messages', component: Messages },
    { path: '/donation', component: Donate },
    { path: '/signup', component: Signup },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },  // Auth required
    { path: '/volunteer', component: Volunteer, meta: { requiresAuth: true, minAccessLevel: 1 } },  // Volunteer (Access Level 1+)
    { path: '/admin', component: Admin, meta: { requiresAuth: true, minAccessLevel: 4 } },  // Admin Only
    { path: "/animals", component: () => import("@/views/Animals.vue"),}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router