import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: {},
  },
  reducers: {
    addMovies: (state, action) => {
      const { category, movies } = action.payload;
      state[category] = movies;
    },
  },
});
export const { addMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
