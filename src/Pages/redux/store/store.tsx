import { configureStore } from "@reduxjs/toolkit";
import WishlistandWatchlist from "../reduxTools/WishlistandWatchlist";
import SnackbarHandler from "../reduxTools/SnackbarHandler";
import HandleUserLogin from "../reduxTools/HandleUserLogin";

export default configureStore({
  reducer: {
    userlist: WishlistandWatchlist,
    snackbar: SnackbarHandler,
    Login: HandleUserLogin,
  },
});
