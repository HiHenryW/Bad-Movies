const mongoose = require('mongoose');

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost:27017/badmovies', {
    useNewUrlParser: true,
  });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
});

// SET UP SCHEMAS
const moviesSchema = new mongoose.Schema({
  movieID: { type: Number, unique: true },
  name: String,
  genres: [Number],
  rating: Number,
});

let Movies = mongoose.model('Movies', moviesSchema);

const genreSchema = new mongoose.Schema({
  genreID: { type: Number, unique: true },
  name: String,
});

let Genres = mongoose.model('Genres', genreSchema);

// SEED DATABASE WITH EXAMPLE DATA ONLY ONCE

const seedMovies = () => {
  let seed = new Movies({
    movieID: 343611,
    name: 'Jack Reacher: Never Go Back',
    genres: [53, 28, 80, 18, 9648],
    rating: 4.19,
  });
  seed.save((err, seed) => {
    if (err) {
      console.log(err);
    }
    console.log(`${seed.name} saved to database!`);
  });
};

// seedMovies();

const seedGenres = () => {
  let seed = new Genres({
    genreID: 28,
    name: 'Action',
  });
  seed.save((err, seed) => {
    if (err) {
      console.log(err);
    }
    console.log(`${seed.name} saved to database!`);
  });
};

// seedGenres();

module.exports.db = db;
