import axios from 'axios';
// import { AxiosRequestConfig } from 'axios';

export const axiosClient = axios.create({
    baseURL: 'http://localhost:4000/api/',
    timeout: 1000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Origin':'http://localhost:4000'
    },
});

