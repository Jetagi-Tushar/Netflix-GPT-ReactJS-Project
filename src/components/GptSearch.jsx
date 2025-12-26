import React, { useRef, useState } from "react";
import client from "../utils/openai";
import { OMDB_BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addGptMovies } from "../utils/gptSlice";
import GptResults from "./GptResults";

const GptSearch = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);

  const searchOMDBMovie = async (movieTitle) => {
    const res = await fetch(`${OMDB_BASE_URL}s=${movieTitle}`);
    const data = await res.json();
    return data.Search;
  };

  const handleSearch = async () => {
    const query = searchText.current.value.trim();

    // 1️⃣ Prevent empty or duplicate calls
    if (!query || loading) return;

    setLoading(true);

    const baseQuery =
      "Act as a movie recommendation engine. Suggest 5 movies based on the following user query: " +
      query +
      ". Only return the movie names as a comma-separated list.";

    try {
      const response = await client.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "user",
            content: baseQuery,
          },
        ],

        // 2️⃣ Cost & output control
        max_tokens: 120,
        temperature: 0.7,
      });

      console.log(response.choices[0].message.content.split(","));

      const movieTitles = response.choices[0].message.content.split(",");
      const moviePromiseArray = movieTitles.map((movie) =>
        searchOMDBMovie(movie.trim())
      );
      const moviesResults = await Promise.all(moviePromiseArray);
      console.log("Movies Results:", moviesResults);

      // Dispatch the movies to the Redux store
      dispatch(
        addGptMovies({ OMDBResults: moviesResults, movieNames: movieTitles })
      );
    } catch (error) {
      // 3️⃣ Graceful error handling
      if (error.status === 429) {
        alert("Too many requests. Please wait a moment and try again.");
      } else {
        console.error("OpenAI error:", error);
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
      searchText.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-[#0f0f0f] to-black pt-24 sm:pt-28 px-4">
      {/* Hero Section */}
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#f84238] tracking-wide">
          GPT Picks
        </h1>

        <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-lg max-w-xl mx-auto">
          Ask anything and let AI curate the perfect movies for your mood 🍿
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={(e) => e.preventDefault()}>
          <div
            className="
            flex flex-col sm:flex-row
            items-stretch sm:items-center
            bg-white/5 backdrop-blur-md
            border border-white/10
            rounded-2xl sm:rounded-full
            overflow-hidden
            shadow-lg
          "
          >
            <input
              ref={searchText}
              type="text"
              placeholder="e.g. Dark thrillers with plot twists"
              className="
              grow
              px-4 sm:px-6
              py-3 sm:py-4
              bg-transparent
              text-white
              placeholder-gray-400
              outline-none
              text-sm sm:text-lg
            "
              disabled={loading}
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className={`
              px-6 sm:px-8
              py-3 sm:py-4
              text-white font-semibold
              transition
              sm:rounded-full
              ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#f84238] hover:bg-red-600"
              }
            `}
            >
              {loading ? "Thinking..." : "Ask GPT"}
            </button>
          </div>
        </form>
      </div>

      <GptResults />
    </div>
  );
};

export default GptSearch;
