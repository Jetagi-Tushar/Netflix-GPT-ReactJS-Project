import { useSelector } from "react-redux";

const Hero = () => {
  const trending = useSelector((store) => store.movies.trending);
  if (!trending) return null;

  const movie = trending[0];

  return (
    <div className="pt-16 h-[70vh] bg-linear-to-r from-black via-gray-900 to-black flex items-center px-12 text-white">
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold">{movie.Title}</h1>
        <p className="mt-3 opacity-80">{movie.Year}</p>

        <div className="mt-6 flex gap-4">
          <button className="bg-white text-black px-6 py-2 rounded">
            ▶ Play
          </button>
          <button className="bg-gray-700 px-6 py-2 rounded">ℹ More Info</button>
        </div>
      </div>

      <img
        className="ml-auto h-[60vh] rounded-lg shadow-xl"
        src={movie.Poster}
        alt={movie.Title}
      />
    </div>
  );
};

export default Hero;
