import axios from 'axios';

const mongodb_api = axios.create({
    baseURL: "http://192.168.18.237:3333"
})

export default mongodb_api;