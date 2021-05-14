import React from 'react'

// var MovieListEntry = (props) => (
//   <div>
//     <h2>{props.movie.title}</h2><button>To Watch</button><hr/>
//   </div>
// )

class MovieListEntry extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonText: 'To Watch',
      toggled: true
    }

    this.handleWatchedClick = this.handleWatchedClick.bind(this);
  }

  handleWatchedClick(event) {
    //check if toggled value is true or false
    console.log('handleWatchedClick');
    if (this.state.toggled) {
    // if toggled is true
      // change toggle watch to 'watched'
      this.setState({
        buttonText: 'Watched'
      })
    } else {
      this.setState({
        buttonText: 'To Watch'
      })
    }
    //else
      // change toggle watch to 'to watch'
    // change toggled to its opposite
    this.setState({
      toggled: !this.state.toggled
    })

    // console.log('event target', event.target);
  }

  render() {
    return (
      <div>
        <h2>{this.props.movie.title}</h2><button onClick={() => {
          this.props.handleWatchClick(this.props.movie);
          this.handleWatchedClick(event);
        }}>{this.state.buttonText}</button><hr/>
     </div>
    )
  }

}

export default MovieListEntry;