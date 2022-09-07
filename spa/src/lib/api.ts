import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASE_URL;

// const BASEURL = 'http://localhost:7107/api';

export const API = axios.create({
    baseURL: BASEURL,
    headers: { 'Content-Type': 'application/json' },
});
