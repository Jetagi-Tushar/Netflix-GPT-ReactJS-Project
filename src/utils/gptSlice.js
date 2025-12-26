import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovies: null,
    OMDBResults: null,
    movieNames: null,
  },
  reducers: {
    setShowGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovies: (state, action) => {
      const { OMDBResults, movieNames } = action.payload;
      state.OMDBResults = OMDBResults;
      state.movieNames = movieNames;
    },
  },
});

export const { setShowGptSearch, addGptMovies } = gptSlice.actions;
export default gptSlice.reducer;
