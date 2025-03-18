import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Dashboard from '@/views/Dashboard.vue';
import Messsages from "@/views/Messsages.vue";
import Donate from "@/views/Donate.vue";
import Admin from "@/views/Admin.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/messages', component: Messsages},
    { path: '/donation', component: Donate},
    { path: '/admin', component: Admin, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
