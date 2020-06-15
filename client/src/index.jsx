import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };

    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  getMovies(genreID) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios
      .get('http://localhost:3000/movies/search', {
        params: { genre: genreID },
      })
      .then((res) => {
        // console.log(res.data);
        this.setState({ movies: res.data });
      })
      .catch((err) => {
        console.log('err in getMovies: ', err);
      });
  }

  getFavorites() {
    axios
      .get('http://localhost:3000/movies/favorites')
      .then((res) => {
        this.setState({
          favorites: res.data,
        });
      })
      .catch((err) => {
        console.log('err in getFavorites: ', err);
      });
  }

  saveMovie(movie) {
    // console.log('saveMovie movie object: ', movie);
    axios
      .post('http://localhost:3000/movies/save', {
        movieID: movie.movieID,
        name: movie.name,
        genres: movie.genres,
        rating: movie.rating,
        year: movie.year,
        image: movie.image,
      })
      .then((res) => {
        // console.log('res object: ', res);
        let currFavorites = this.state.favorites;
        let newFavorites = currFavorites.concat(res.data);
        this.setState({
          favorites: newFavorites,
        });
        // console.log('saveMovie ran! favorites: ', this.state.favorites);
      })
      .catch((err) => {
        console.log('err in saveMovie: ', err);
      });
  }

  deleteMovie(movie) {
    // console.log('deleteMovie entered! movieID: ', movie.movieID);
    axios
      .delete('http://localhost:3000/movies/delete', {
        data: {
          movieID: movie.movieID,
        },
      })
      .then(() => {
        this.getFavorites();
      })
      .catch((err) => {
        console.log('err in deleteMovie: ', err);
      });
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves,
    });
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
            saveMovie={this.saveMovie}
            deleteMovie={this.deleteMovie}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
