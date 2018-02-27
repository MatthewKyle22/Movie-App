import React, { Component } from "react";
import "./App.css";
import { getMovies } from "./getMovie/getMovie";
import _ from "lodash";
import { image } from "superagent/lib/node/parsers";

class App extends Component {
  constructor() {
    super();
    this.state = { movies: [] };
  }

  componentWillMount() {
    const movieList = ["jack+reacher", "toy+story", "avatar"];
    getMovies(movieList, movie => this.addMovie(movie));
  }

  addMovie(movie) {
    let state = this.state;
    state.movies.push(movie);
    this.setState(state);
  }

  runSearch(movieTitle) {
    getMovies([movieTitle], movie => this.addMovie(movie));
  }

  render() {
    // console.log(this.state.movies)
    return (
      <div className="App">
        <div className="App-searchBox">
          <h1>Movie Search</h1>
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
              <button className="App-delete">Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
