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
        let prevFavorites = this.state.favorites;
        prevFavorites.push(res.movie);
        this.setState({
          favorites: prevFavorites,
        });
      })
      .catch((err) => {
        console.log('err in saveMovie: ', err);
      });
  }

  deleteMovie() {
    // same as above but do something diff
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
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
