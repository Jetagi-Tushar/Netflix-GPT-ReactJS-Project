import { useSelector } from "react-redux";

const MovieRow = ({ title, category }) => {
  const movies = useSelector((store) => store.movies[category]);
  if (!movies) return null;

  return (
    <div className="px-6 py-4">
      <h2 className="text-white text-xl mb-3">{title}</h2>

      <div className="movie-row">
        {movies.map((movie) => (
          <div key={`${category}-${movie.imdbID}`} className="movie-card">
            <img
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
