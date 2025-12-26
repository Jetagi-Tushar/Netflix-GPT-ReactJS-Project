import { useSelector } from "react-redux";

const Hero = () => {
  const trending = useSelector((store) => store.movies.trending);
  if (!trending) return null;

  const movie = trending[0];

  return (
    <div
      className="
      pt-24
      h-auto sm:h-[70vh]
      bg-linear-to-r from-black via-gray-900 to-black
      flex flex-col sm:flex-row
      items-center
      px-4 sm:px-12
      text-white
      gap-6
    "
    >
      {/* Text Section */}
      <div className="max-w-xl text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl font-bold">{movie.Title}</h1>

        <p className="mt-2 sm:mt-3 opacity-80 text-sm sm:text-base">
          {movie.Year}
        </p>

        <div className="mt-4 sm:mt-6 flex justify-center sm:justify-start gap-4">
          <button className="bg-white text-black px-5 sm:px-6 py-2 rounded">
            ▶ Play
          </button>
          <button className="bg-gray-700 px-5 sm:px-6 py-2 rounded">
            ℹ More Info
          </button>
        </div>
      </div>

      {/* Image */}
      <img
        className="
    w-full sm:w-auto
    max-w-xs sm:max-w-none
    h-auto sm:h-[57vh]
    rounded-lg
    shadow-xl
    sm:ml-auto
  "
        src={movie.Poster}
        alt={movie.Title}
      />
    </div>
  );
};

export default Hero;
