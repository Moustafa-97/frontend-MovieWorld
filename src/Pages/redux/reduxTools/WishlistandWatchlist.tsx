import { createSlice } from "@reduxjs/toolkit";

const wishlist: Array<Object> | null | any = localStorage.getItem("wishlist");
const parsedWishlist: any = JSON.parse(wishlist);
const watchlist: Array<Object> | null | any = localStorage.getItem(
  "watchedlist"
);
const parsedWatchlist: any = JSON.parse(watchlist);

const initialState = {
  loged: false,
  wishMovie: wishlist ? parsedWishlist : [],
  wishnumber: wishlist ? parsedWishlist?.length : 0,
  watchMovie: watchlist ? parsedWatchlist : [],
  watchnumber: watchlist ? parsedWatchlist?.length : 0,
  message: "please login",
  page: 1,
};
const WishlistandWatchlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    AddRemoveMovieWish: (state, action) => {
      if (!state.loged) {
        let movieIndex = state.wishMovie?.findIndex(
          (i: any) => i === action.payload.id
        );

        console.log(movieIndex);
        if (movieIndex >= 0) {
          // remove from array
          state.wishMovie.splice(movieIndex, 1);
          state.wishnumber -= 1;
        } else {
          // add to array
          const newItem = action.payload.id;
          state.wishMovie.push(newItem);
          state.wishnumber += 1;
        }
      } else {
        alert(state.message);
      }
    },
    AddRemoveMovieWatch: (state, action) => {
      if (!state.loged) {
        let movieIndex = state.watchMovie?.findIndex(
          (i: any) => i === action.payload.id
        );

        if (movieIndex >= 0) {
          // remove the movie from the array
          state.watchMovie.splice(movieIndex, 1);
          state.watchnumber -= 1;
        } else {
          // add the movie to the array
          const newItem = action.payload.id;
          state.watchMovie.push(newItem);
          state.watchnumber += 1;
        }
      } else {
        alert(state.message);
      }
    },
    RefreshPage: (state, action) => {
      state.page = action.payload;
    },
  },
});
export const {
  AddRemoveMovieWish,
  AddRemoveMovieWatch,
  RefreshPage,
} = WishlistandWatchlist.actions;
export default WishlistandWatchlist.reducer;
