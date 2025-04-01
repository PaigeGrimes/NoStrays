import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});

// Login
export const login = async (username: string, password: string) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, { username, password });
        return res.data;
    } catch (err) {
        console.error('Login failed');
        return null;
    }
};


// Logout
export const logout = async () => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`);
};

// Get Authenticated User
export const getUser = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`);
        return res.data.user;
    } catch {
        return null;
    }
};

export default API;