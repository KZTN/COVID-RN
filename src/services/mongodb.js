import axios from 'axios';
const mongodb = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export default mongodb;