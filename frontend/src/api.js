// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/auth';

// Signup API call
export const signup = async (userData) => {
    return axios.post(`${API_BASE_URL}/signup`, userData, { withCredentials: true });
};

// Verify OTP API call
export const verifySignup = async (otpData) => {
    return axios.post(`${API_BASE_URL}/verifySignup`, otpData, { withCredentials: true });
};

// Login API call
export const login = async (loginData) => {
    return axios.post(`${API_BASE_URL}/login`, loginData, { withCredentials: true });
};

// Logout API call
export const logout = async () => {
    return axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
};



