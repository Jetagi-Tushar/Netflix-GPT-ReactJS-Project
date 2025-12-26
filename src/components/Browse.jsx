import { Header } from "./Header";
import Hero from "./Hero";
import MovieRow from "./MovieRow";
import useMovies from "../customHooks/useMovies";
import { MOVIE_CATEGORIES } from "../utils/movieCategories";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  // ✅ Call hooks explicitly (React rule)
  useMovies("trending", "avengers");
  useMovies("action", "action");
  useMovies("sciFi", "space");
  useMovies("drama", "love");
  useMovies("batman", "batman");

  return (
    <div className="bg-black min-h-screen">
      <Header />

      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <Hero />
          {MOVIE_CATEGORIES.map((cat) => (
            <MovieRow key={cat.key} title={cat.title} category={cat.key} />
          ))}
        </>
      )}
    </div>
  );
};

export default Browse;
