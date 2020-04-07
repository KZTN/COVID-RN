import axios from 'axios';

const mongodb_api = axios.create({
    baseURL: "covid-rn.herokuapp.com/"
})

export default mongodb_api;