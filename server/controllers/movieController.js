const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
const { db } = require('../../db/mongodb');

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
      .then((genres) => {
        let genresArray = genres.data.genres;
        Promise.all(
          genresArray.map((data) => {
            return db.models.Genres.findOneAndUpdate(
              { genreID: data.id },
              { genreID: data.id, name: data.name },
              { upsert: true }
            );
          })
        ).then((data) => {
          res.status(200).json(data);
        });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
  saveMovie: (req, res) => {},
  deleteMovie: (req, res) => {},
};

// module.exports.getGenres();
