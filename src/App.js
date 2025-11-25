import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Logo from "./component/Logo";
import Search from "./component/Search";
import Loader from "./component/Loader";
import ErrorMessage from "./component/ErrorMessage";
import NumResults from "./component/NumResults";
import Main from "./component/Main";
import Box from "./component/Box";
import MoviesList from "./component/MoviesList";
import MoviesDetails from "./component/MoviesDetails";
import WatchSummary from "./component/WatchSummary";
import WatchedMoviesList from "./component/WatchedMoviesList";

const key = "f18cbd90";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fitchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`
          );
          if (!res.ok)
            throw new Error("something went wrong with fitch data movies ");
          const data = await res.json();
          if (data.Response === "False") throw new Error("movies not found");
          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fitchMovies();
    },
    [query]
  );

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleClose() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  return (
    <>
      <Navbar>
        <Logo />
        <Search setQuery={setQuery} query={query} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {!isLoading && !error && (
            <MoviesList movies={movies} onClickMovie={handleSelectMovie} />
          )}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MoviesDetails
              selectedId={selectedId}
              onClickClose={handleClose}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
