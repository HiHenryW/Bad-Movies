import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    return (
      <ul className="movies">
        {this.props.movies.map((movie, i) => {
          // console.log(movie.image);
          return (
            <li className="movie_item" key={i}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} />
              <div className="movie_description">
                <h2>{movie.name}</h2>
                <section className="movie_details">
                  <div className="movie_year">
                    <span className="title">Year</span>
                    <span>{movie.year}</span>
                  </div>
                  <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.rating}</span>
                  </div>
                </section>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Movies;
