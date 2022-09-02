import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASE_URL;

export const API = axios.create({
    baseURL: BASEURL,
    headers: { 'Content-Type': 'application/json' },
});