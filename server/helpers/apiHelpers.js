const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org
module.exports = {
  getOfficialGenres: () => {
    let requestUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
    return axios.get(requestUrl);
  },

  getMovies: (genreID) => {
    let requestUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
    return axios.get(requestUrl, {
      params: {
        language: 'en-US',
        sort_by: 'vote_average.asc',
        include_adult: false,
        include_video: false,
        'vote_count.gte': 300,
        with_genres: genreID,
      },
    });
  },
};