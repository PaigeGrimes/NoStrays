import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5001',
    withCredentials: true
});

// Login
export const login = async (username: string, password: string) => {
    try {
        const res = await API.post('/login', { username, password });
        return res.data;
    } catch (err) {
        console.error('Login failed');
        return null;
    }
};


// Logout
export const logout = async () => {
    await API.post('/logout');
};

// Get Authenticated User
export const getUser = async () => {
    try {
        const res = await API.get('/user');
        return res.data.user;
    } catch {
        return null;
    }
};