import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Dashboard from '@/views/Dashboard.vue';
import Donate from '@/views/Donate.vue'
import Messsages from "@/views/Messsages.vue";
import HR from '@/views/HR.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/donation', component: Donate },
    { path: '/messages', component: Messsages },
    { path: '/update-access', component: HR }
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
