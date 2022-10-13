import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASE_URL;

// const STAGINGURL = process.env.REACT_APP_STAGING_URL;

const API = axios.create({
    baseURL: BASEURL,
    headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export { API };
