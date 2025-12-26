const MovieCard = ({ movie }) => {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="w-40 shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300">
      <img
        src={poster}
        alt={movie.Title}
        className="w-full h-60 object-cover rounded-lg"
      />

      <div className="mt-2">
        <h3 className="text-white text-sm font-semibold truncate">
          {movie.Title}
        </h3>
        <p className="text-gray-400 text-xs">
          {movie.Year} • {movie.Type}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
