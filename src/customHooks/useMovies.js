import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OMDB_BASE_URL } from "../utils/constant";
import { addMovies } from "../utils/moviesSlice";

const useMovies = (category, searchTerm) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchTerm) return;

    const fetchMovies = async () => {
      try {
        const res = await fetch(`${OMDB_BASE_URL}s=${searchTerm}`);
        const data = await res.json();

        if (data.Response === "True") {
          const uniqueMovies = Array.from(
            new Map(data.Search.map((movie) => [movie.imdbID, movie])).values()
          );
          dispatch(
            addMovies({
              category,
              movies: uniqueMovies,
            })
          );
        }
      } catch (err) {
        console.error("OMDb Error:", err);
      }
    };

    fetchMovies();
  }, [category, searchTerm, dispatch]);
};
export default useMovies;
// `${OMDB_BASE_URL}s=batman`;
