import { useSelector } from "react-redux";

const MovieRow = ({ title, category }) => {
  const movies = useSelector((store) => store.movies[category]);
  if (!movies) return null;

  return (
    <div className="px-4 sm:px-6 py-3 sm:py-4">
      <h2 className="text-white text-lg sm:text-xl mb-2 sm:mb-3">{title}</h2>

      <div
        className="
        movie-row
        flex gap-3 sm:gap-4
        overflow-x-auto
        scrollbar-hide
      "
      >
        {movies.map((movie) => (
          <div
            key={`${category}-${movie.imdbID}`}
            className="movie-card shrink-0"
          >
            <img
              className="
              w-32 sm:w-40 md:w-48
              rounded-md
            "
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/200x300"
              }
              alt={movie.Title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
