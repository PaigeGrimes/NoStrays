import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') || 'null')
    }),
    actions: {
        async login(username: string, password: string) {
            // Fake user database (Replace with actual authentication logic)
            const users = [
                { username: 'volunteer', password: '1234', accessLevel: 0 },
                { username: 'caregiver', password: '1234', accessLevel: 1 },
                { username: 'hr', password: '1234', accessLevel: 2 },
                { username: 'board', password: '1234', accessLevel: 3 },
                { username: 'ceo', password: '1234', accessLevel: 4 }
            ];

            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                this.user = { username: user.username, accessLevel: user.accessLevel };
                localStorage.setItem('user', JSON.stringify(this.user));
                return true;
            }
            return false;
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
        }
    }
});
