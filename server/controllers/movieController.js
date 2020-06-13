const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre
    // https://www.themoviedb.org/account/signup
    // get your API KEY
    // use this endpoint to search for movies by genres, you will need an API key
    // https://api.themoviedb.org/3/discover/movie
    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    apiHelpers
      .getOfficialGenres()
      .then((apiRes) => {
        res.status(200).json(apiRes.data.genres); // --> [{id: 00, name: 'genreName'}, {}, ...]
      })
      .catch((err) => {
        console.log('err in getGenres: ', err);
        res.sendStatus(404);
      });
  },
  saveMovie: (req, res) => {},
  deleteMovie: (req, res) => {},
};

// module.exports.getGenres();
