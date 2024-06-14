import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mysite-7mb8.onrender.com/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export default axiosInstance;
