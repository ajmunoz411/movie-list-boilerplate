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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    // console.log('event target value', event.target.value);
    // console.log('event target name', event.target.name);
  }

  handleSubmit(event) {
    event.preventDefault();
    // make new array
    var matchedMovies = [];
    // iterate through movie data, check if movie includes search value
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
      movieData: matchedMovies
    })
  }

  handleAdd(event) {
    event.preventDefault();
    var addedMovie = {};
    addedMovie.title = this.state.addMovie;
    console.log('addedMovie', addMovie);
  }

  render() {
    return (
      <div>
        <h1>Movie List</h1><hr/>
        <form id="addMovie">
          <input type="text" placeholder="Add movie title here" name="addMovie" onChange={this.handleChange}></input>
          <button>Add</button>
        </form>
        <br></br>
        <form id="movieSearch" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search..." name="search" onChange={this.handleChange}></input>
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