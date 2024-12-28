import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

export const fetchTrends = () => API.get('/fetch-trends');
export const getLatestTrend = () => API.get('/get-latest-trend');

