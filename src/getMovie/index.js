import Request from "superagent";

const getMovies = (movies, addMovie) => {
  movies.map(movie => {
    const url =
      "https://api.themoviedb.org/3/search/movie?api_key=40cbd933a95464e54a153ffde8b5498b&query=" +
      movie;
    Request.get(url).then(response => {
      const totalResults = response.body.total_results;
      if (totalResults > 0) {
        let result = {
          title: response.body.results[0].title,
          description: response.body.results[1].overview,
          poster:
            "https://image.tmdb.org/t/p/w500/" +
            response.body.results[0].poster_path
        };
        addMovie(result);
      } else {
        alert("Not A Movie");
      }
    });
    return {};
  });
};

export { getMovies };
