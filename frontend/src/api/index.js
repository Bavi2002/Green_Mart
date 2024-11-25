import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api',  // Replace with your backend URL
    withCredentials: true // Important: This allows cookies (session) to be sent
});

export const signup = (data) => API.post('/auth/signup', data);
export const verifySignup = (data) => API.post('/auth/verifySignup', data);
export const login = (data) => API.post('/auth/login', data);