import Movie from "./Movie";

export default function MoviesList({ movies, onClickMovie }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} onClickMovie={onClickMovie} />
        ))}
      </ul>
    </>
  );
}
