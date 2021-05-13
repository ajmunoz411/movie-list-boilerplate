import React from 'react';
import movieData from '../data/movieData.js';
import MovieListEntry from './MovieListEntry.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieData: movieData,
      search: '',
      addMovie: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSearch(event) {
    event.preventDefault();
    var matchedMovies = [];
    for (var i = 0; i < this.state.movieData.length; i++) {
      var currentMovie = this.state.movieData[i];
      var lowerMovie = currentMovie.title.toLowerCase();
      if (lowerMovie.includes(this.state.search.toLowerCase())) {
        matchedMovies.push(currentMovie);
      }
    }

    if (matchedMovies.length === 0) {
      matchedMovies.push({title: "No Movie Found by that Name"})
    }

    this.setState({
      movieData: matchedMovies,
      search: ''
    })
  }

  handleAdd(event) {
    event.preventDefault();
    var addedMovie = {};
    addedMovie.title = this.state.addMovie;
    this.state.movieData.push(addedMovie);
    // console.log('new movie Data', this.state.movieData);
    this.setState({
      movieData: movieData,
      addMovie: ''
    })

  }

  render() {
    return (
      <div>
        <h1>Movie List</h1><hr/>
        <form id="addMovie" onSubmit={this.handleAdd}>
          <input type="text" placeholder="Add movie title here" name="addMovie" onChange={this.handleChange} value={this.state.addMovie}></input>
          <button>Add</button>
        </form>
        <br></br>
        <form id="movieSearch" onSubmit={this.handleSearch}>
          <input type="text" placeholder="Search..." name="search" onChange={this.handleChange} value={this.state.search}></input>
          <button>Go!</button>
        </form>
        <div className="movieList">
          {this.state.movieData.map((movie, index) => <MovieListEntry movie={movie} key={index} />)}
        </div>
      </div>
    )
  }
}


export default App;