import axios from 'axios';

const baseURL = import.meta.env.PROD ? 'https://articulo-backend.onrender.com/api' : 'http://localhost:4000/api';

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
});

export default axiosInstance;
