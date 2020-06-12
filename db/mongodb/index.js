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

// SET UP SCHEMA
const moviesSchema = new mongoose.Schema({
  movieID: Number,
  name: String,
  genres: [Number],
  rating: Number,
});

const Movies = mongoose.model('Movies', moviesSchema);

module.exports.db = db;
