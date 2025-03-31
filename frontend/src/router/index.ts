import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import About from '../views/About.vue';
import Donate from "../views/Donate.vue";
import Login from '../views/Login.vue';
import Messages from '../views/Messsages.vue';
import Admin from '../views/Admin.vue';
import Signup from "@/views/Signup.vue";
import Volunteer from "@/views/Volunteer.vue";
import Dashboard from "@/views/Dashboard.vue";
import Animals from "@/views/Animals.vue";
import BoardMember from "@/components/BoardMember.vue";
import Caregiver from "@/views/Caregiver.vue";
import { getUser } from "@/auth";  // Function to check user session

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/messages', component: Messages },
    { path: '/donation', component: Donate },
    { path: '/signup', component: Signup },
    { path: '/animals', component: Animals },

    // Routes requiring authentication
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/volunteer', component: Volunteer, meta: { requiresAuth: true, minAccessLevel: 1 } },
    { path: '/caregiver', component: Caregiver, meta: { requiresAuth: true, minAccessLevel: 2 } },
    { path: '/boardMember', component: BoardMember, meta: { requiresAuth: true, minAccessLevel: 3} },// Volunteers and above
    { path: '/admin', component: Admin, meta: { requiresAuth: true, minAccessLevel: 4 } },  // Admins only
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Add a global navigation guard
router.beforeEach(async (to, from, next) => {
    // Try to get the user from local storage or API
    let user = JSON.parse(<string>localStorage.getItem("user")); // Check localStorage first

    if (!user) {
        user = await getUser(); // Fallback to fetching user from API
        if (user) {
            localStorage.setItem("user", JSON.stringify(user)); // Store it in localStorage for faster access
        }
    }

    // Handle route that requires authentication
    if (to.meta.requiresAuth && !user) {
        return next('/login');  // Redirect if not authenticated
    }

    // Handle route that requires specific access levels
    if (to.meta.minAccessLevel && user?.accessLevel < to.meta.minAccessLevel) {
        return next('/');  // Redirect if access level is too low
    }

    next();
});

export default router;
