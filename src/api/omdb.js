import axios from 'axios';
const KEY = '97d3cb096ce5f30091ea4ae7e083c305';

export const getPopularMovies = () => {
    return axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
            api_key: KEY
        }
    })
};

export const searchMovies = (query) => {
    return axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
            api_key: KEY,
            query
        }
    })
};

export const getMovie = (id) => {
    return axios.get('https://api.themoviedb.org/3/movie/'+id, {
        params: {
            api_key: KEY
        }
    })
};