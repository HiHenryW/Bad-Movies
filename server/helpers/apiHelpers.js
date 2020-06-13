const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org
module.exports = {
  getOfficialGenres: () => {
    let requestUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
    return axios.get(requestUrl);
  },
};

// Don't forget to export your functions and require them within your server file
