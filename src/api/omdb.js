import getPopularMoviesData from './getPopularMovies.json';
import searchMoviesData from './searchMovies.json';
import getMovieData from './getMovie.json';

import axios from 'axios';
const KEY = '97d3cb096ce5f30091ea4ae7e083c305';


export const getPopularMovies = () => {
    return new Promise((resolve) => resolve({ data: getPopularMoviesData }));
};

export const searchMovies = () => {
    return new Promise((resolve) => resolve({ data: searchMoviesData }));
};

export const getMovie = () => {
    return new Promise((resolve) => resolve({ data: getMovieData }));
};

export const _getPopularMovies = () => {
    return axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
            api_key: KEY
        }
    })
};

export const _searchMovies = (query) => {
    return axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
            api_key: KEY,
            query
        }
    })
};

export const _getMovie = (id) => {
    return axios.get('https://api.themoviedb.org/3/movie/'+id, {
        params: {
            api_key: KEY
        }
    })
};