import axios from 'axios';
const KEY = '97d3cb096ce5f30091ea4ae7e083c305';

export const omdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: KEY
    }
});