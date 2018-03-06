import React, { Component } from "react";
import { getMovies } from "./getMovie";
import _ from "lodash";
// import { image } from "superagent/lib/node/parsers";
import styled from "styled-components";

// Styling Start

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
  min-height: 100vh;
  padding-bottom: 5%;
`;

const MoviesWidget = styled.div`
  width: 50%;
  padding: 2%;
  margin: 0 auto;
  margin-top: 2%;
  background-color: white;
  border-radius: 10px;
`;

const Searchbar = styled.input`
  padding: 1em 4em 1em 4em;
  border-radius: 4px;
  border-color: lightgray;
  margin: 1em 2em 1em 2em;
`;

const Submit = styled.button`
  padding: 1em;
  border-radius: 4px;
  background-color: green;
  color: white;
`;

const Delete = styled.button`
  float: right;
  padding: 4px;
  color: white;
  background-color: #ff3530;
  border: none;
  border-radius: 2px;
`;

const Pic = styled.img``;

// hidden until ready to be used
// const TryAgain = styled.div`
//   color: red;
//   font-weight: bold;
//   background-color: white;
//   width: 50%;
//   margin: 0 auto;
//   margin-bottom: 2%;
//   padding: 1%;
//   border-radius: 10px;
// `;

// Styling End

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
      <Wrapper>
        <div>
          <h1>Movie Search</h1>
          {/* {!this.state.isHidden && <InvalidMovie />} */}
          <Searchbar
            type="text"
            placeholder="Enter A Movie Name"
            name="a"
            id="a"
          />
          <Submit
            onClick={() => this.runSearch(document.getElementById("a").value)}
          >
            Search
          </Submit>
        </div>
        {_.orderBy(this.state.movies, "title", "asc").map(movie => {
          return (
            <MoviesWidget key={movie.title}>
              <Pic src={movie.poster} width="150" height="250" />
              <h2>{movie.title}</h2>
              <p>{movie.description} </p>
              <Delete onClick={() => this.removeMovie(movie)}>Delete</Delete>
            </MoviesWidget>
          );
        })}
      </Wrapper>
    );
  }
}

/* Add this when movie is not found */

// const InvalidMovie = () => (
//   <TryAgain>
//     <p>
//       The Movie Title You Have Entered Is Not Valid.
//       <br /> Please Enter A Valid Movie Title
//     </p>
//   </TryAgain>
// );

export default App;
