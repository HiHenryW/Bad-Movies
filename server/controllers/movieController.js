const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
const { db } = require('../../db/mongodb');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    let searchGenre = req.body.genre;
    apiHelpers
      .getMovies(searchGenre)
      .then((movies) => {
        let moviesArray = movies.data.results;
        Promise.all(
          moviesArray.map((data) => {
            return db.models.Movies.findOneAndUpdate(
              { movieID: data.id },
              {
                movieID: data.id,
                name: data.title,
                genres: data.genre_ids,
                rating: data.vote_average,
              },
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
