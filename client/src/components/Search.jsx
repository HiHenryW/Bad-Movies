import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      selectedValue: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    // console.log('getGenres was reached!');
    axios.get('http://localhost:3000/movies/genres')
    .then((res) => {
      // console.log('genres get response data: ', res.data);
      this.setState({
        genres: res.data,
      });
    })
    .catch((err) => {
      console.log('err in getGenres: ', err);
    })
  }

  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
    // console.log(this.state.selectedValue);
  }

  handleClick(event) {
    event.preventDefault();
    // console.log('clicked!')
    // console.log('selectedValue: ', this.state.selectedValue)
    this.props.getMovies(this.state.selectedValue);
  }

  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>
        <br />
        <br />

        <select
          value={this.state.selectedValue || ''}
          onChange={this.handleChange}
        >
          <option value=""></option>
          {this.state.genres.map((genre, i) => {
            return (
              <option key={i} value={genre.genreID}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />

        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}

export default Search;
