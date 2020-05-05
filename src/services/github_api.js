import axios from 'axios';

const github_api = axios.create({
    baseURL: 'https://api.github.com',
});

export default github_api;
