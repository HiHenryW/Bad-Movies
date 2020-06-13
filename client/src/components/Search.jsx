import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
    };
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    // console.log('getGenres was reached!');
    axios.get('http://localhost:3000/movies/genres').then((res) => {
      // console.log('genres get response data: ', res.data);
      this.setState({
        genres: res.data,
      });
    });
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

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select>
          {this.state.genres.map((genre, i) => {
            return <option key={i}>{genre.name}</option>;
          })}
        </select>
        <br />
        <br />

        <button>Search</button>
      </div>
    );
  }
}

export default Search;
