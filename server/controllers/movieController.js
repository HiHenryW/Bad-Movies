const { saveMovies } = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
const { db } = require('../../db/mongodb');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // console.log('req in getSearch: ', req.query.genre);
    apiHelpers
      .getMovies(req.query.genre)
      .then((movies) => {
        let moviesArray = movies.data.results;
        return Promise.all(
          moviesArray.map((data) => {
            return db.models.Movies.findOneAndUpdate(
              { movieID: data.id },
              {
                movieID: data.id,
                name: data.title,
                genres: data.genre_ids,
                rating: data.vote_average,
                year: data.release_date.substring(0, 4),
                image: data.poster_path,
              },
              { upsert: true }
            ).exec();
          })
        );
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log('err in getSearch: ', err);
        res.sendStatus(404);
      });
  },
  getGenres: (req, res) => {
    apiHelpers
      .getOfficialGenres()
      .then((genres) => {
        let genresArray = genres.data.genres;
        return Promise.all(
          genresArray.map((data) => {
            return db.models.Genres.findOneAndUpdate(
              { genreID: data.id },
              { genreID: data.id, name: data.name },
              { upsert: true }
            ).exec();
          })
        );
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log('err in getGenres: ', err);
        res.sendStatus(404);
      });
  },
  getFavorites: (req, res) => {
    db.models.FavoriteMovies.find({})
      .exec()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log('err in getFavorites: ', err);
        res.sendStatus(404);
      });
  },
  saveMovie: (req, res) => {
    // console.log('saveMovie in controller was accessed!')
    // console.log('req object: ', req.body);
    db.models.FavoriteMovies.findOneAndUpdate(
      { movieID: req.body.movieID },
      {
        movieID: req.body.movieID,
        name: req.body.name,
        genres: req.body.genres,
        rating: req.body.rating,
        year: req.body.year,
        image: req.body.image,
      },
      { upsert: true }
    )
      .exec()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log('err in saveMovie: ', err);
        res.sendStatus(404);
      });
  },
  deleteMovie: (req, res) => {
    console.log('deleteMovie in controller accessed!', req.body.movieID);
    db.models.FavoriteMovies.findOneAndRemove({ movieID: req.body.movieID })
      .exec()
      .then((data) => {
        res.send(200).json(data);
      })
      .catch((err) => {
        console.log('err in deleteMovie: ', err);
        res.sendStatus(404);
      });
  },
};
