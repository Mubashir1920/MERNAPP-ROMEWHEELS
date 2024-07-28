import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})


axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        console.log(BASE_URL)
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;   
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;