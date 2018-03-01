import React, { Component } from "react";
import "./App.css";
import { getMovies } from "./getMovie/getMovie";
import _ from "lodash";
import { image } from "superagent/lib/node/parsers";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
      // isHidden: !this.state.isHidden
    };
  }

  componentWillMount() {
    let state = JSON.parse(localStorage.getItem("state"));
    let movieList = _.map(state.movies, "title");
    getMovies(movieList, movie => this.addMovie(movie));
  }

  persists(state) {
    this.setState(state);
    localStorage.setItem("state", JSON.stringify(state));
  }

  addMovie(movie) {
    let state = this.state;
    state.movies.push(movie);
    this.persists(state);
  }

  removeMovie(movie) {
    let state = this.state;
    let index = _.findIndex(state.movies, movie);
    state.movies.splice(index, 1);
    this.persists(state);
  }

  runSearch(movieTitle) {
    getMovies([movieTitle], movie => this.addMovie(movie));
  }

  // toggleHidden(prop) {
  //   if (prop === true) {
  //     this.setState({
  //       isHidden: !this.state.isHidden
  //     });
  //   }
  // }

  render() {
    return (
      <div className="App">
        <div className="App-searchBox">
          <h1>Movie Search</h1>
          {/* {!this.state.isHidden && <InvalidMovie />} */}
          <input
            className="App-input"
            type="text"
            placeholder="Enter A Movie Name"
            name="a"
            id="a"
          />
          <button
            className="App-button"
            onClick={() => this.runSearch(document.getElementById("a").value)}
          >
            Search
          </button>
        </div>
        {_.orderBy(this.state.movies, "title", "asc").map(movie => {
          return (
            <div className="App-movies" key={movie.title}>
              <img src={movie.poster} width="150" height="250" />
              <h2>{movie.title}</h2>
              <p>{movie.description} </p>
              <button
                className="App-delete"
                onClick={() => this.removeMovie(movie)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

/* Add this when movie is not found */

// const InvalidMovie = () => (
//   <div className="App-error">
//     <p>
//       The Movie Title You Have Entered Is Not Valid.
//       <br /> Please Enter A Valid Movie Title
//     </p>
//   </div>
// );

export default App;
