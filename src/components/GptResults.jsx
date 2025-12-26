import React from "react";
import { useSelector } from "react-redux";

const GptResults = () => {
  const { OMDBResults, movieNames } = useSelector((state) => state.gpt);

  if (!OMDBResults) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 sm:mt-14 px-3 sm:px-4">
      {OMDBResults.map((group, index) => (
        <div
          key={index}
          className="
          mb-6 sm:mb-10
          border border-white/10
          rounded-lg
          p-4 sm:p-5
        "
        >
          {/* Main movie name */}
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
            {movieNames?.[index]}
          </h2>

          {/* Sub movie names */}
          <ul className="space-y-1.5">
            {Array.isArray(group) &&
              group.map((movie) => (
                <li
                  key={movie.imdbID}
                  className="
                  text-sm sm:text-base
                  text-gray-300
                  flex items-start
                "
                >
                  <span className="mr-2 text-gray-500 leading-6">•</span>
                  <span className="leading-6">
                    {movie.Title}
                    <span className="text-gray-500"> ({movie.Year})</span>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GptResults;
