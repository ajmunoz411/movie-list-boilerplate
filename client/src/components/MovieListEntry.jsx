import React from 'react'

var MovieListEntry = (props) => (
  <div>
    <h2>{props.movie.title}</h2><button>To Watch</button><hr/>
  </div>
)

export default MovieListEntry;