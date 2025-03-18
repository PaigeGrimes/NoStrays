import { defineStore } from 'pinia';
import axios from 'axios'; // Ensure axios is installed: npm install axios

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),

    actions: {
        async login(username, password) {
            try {
                const response = await axios.post('/api/login', {
                    username,
                    password
                });

                this.user = response.data.user;
                this.token = response.data.token;

                // Store token in localStorage for persistence
                localStorage.setItem('token', this.token);

                return true;
            } catch (error) {
                console.error('Login failed:', error.response?.data?.message || error.message);
                return false;
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
        },

        async checkAuth() {
            if (!this.token) return false;

            try {
                const response = await axios.get('/api/user', {
                    headers: { Authorization: `Bearer ${this.token}` }
                });

                this.user = response.data;
                return true;
            } catch (error) {
                console.error('Session expired:', error.response?.data?.message || error.message);
                this.logout();
                return false;
            }
        }
    }


});
