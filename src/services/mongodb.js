import axios from 'axios';

const mongodb_api = axios.create({
    baseURL: "https://covid-rn-server.herokuapp.com"
})

export default mongodb_api;