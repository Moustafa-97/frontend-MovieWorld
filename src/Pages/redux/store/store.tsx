import { configureStore } from "@reduxjs/toolkit";
import WishlistandWatchlist from "../reduxTools/WishlistandWatchlist";
import SnackbarHandler from "../reduxTools/SnackbarHandler";

export default configureStore({
  reducer: {
    userlist: WishlistandWatchlist,
    snackbar: SnackbarHandler,
  },
});
