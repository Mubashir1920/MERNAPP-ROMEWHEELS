import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        console.log(BASE_URL);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors gracefully
        console.error('Request error:', error);
        // Optionally show user-friendly messages
        return Promise.reject(error);  // Continue to reject to allow error handling downstream
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;  // Pass the response if successful
    },
    (error) => {
        if (error.response) {
            // Server-side error
            console.error('Response error:', error.response.data);
            // Example: if unauthorized, handle logout or token refresh
            if (error.response.status === 401) {
                // Handle token expiration or invalid token
                console.log('Unauthorized, redirect to login');
                // Optionally, log the user out or refresh the token
            }
        } else if (error.request) {
            // No response received
            console.error('No response from server:', error.request);
        } else {
            // Other errors like timeout, network issues
            console.error('Error:', error.message);
        }
        // Provide a fallback to prevent the app from breaking
        return Promise.resolve({
            success: false,
            message: 'Something went wrong. Please try again later.'
        });
    }
);

export default axiosInstance;
