import React from 'react';
import movieData from '../data/movieData.js';
import MovieListEntry from './MovieListEntry.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieData: movieData,
      search: '',
      addMovie: '',
      watched: [],
      toWatch: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleWatchClick = this.handleWatchClick.bind(this);
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
    addedMovie.watched = false;
    this.state.movieData.push(addedMovie);
    this.state.toWatch.push(addedMovie);
    // console.log('new movie Data', this.state.movieData);
    this.setState({
      movieData: movieData,
      addMovie: ''
    })
  }

  handleWatchClick(movie) {
    console.log('movie', movie);
    //check if toggled value is true or false

    if (!movie.watched) {
      movie.watched = true;
      this.state.watched.push(movie);
      this.setState({
        toWatch: this.state.toWatch.filter(targetMovie => (
        targetMovie.title !== movie.title
      ))
        });
    } else {
      movie.watched = false;
      this.state.toWatch.push(movie);
      this.setState({
        watched: this.state.watched.filter(targetMovie => (
        targetMovie.title !== movie.title
      ))
    })
    console.log('watched movies', this.state.watched);
    console.log('toWatch movies', this.state.toWatch);
    // console.log('event target', event.target);
  }
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
        <br></br><hr />
        <button>Watched</button><button>To Watch</button>
        <br></br><hr />
        <div className="movieList">
          {this.state.movieData.map((movie, index) => <MovieListEntry movie={movie} key={index} handleWatchClick={this.handleWatchClick}/>)}
        </div>
      </div>
    )
  }
}


export default App;