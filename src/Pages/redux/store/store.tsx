import { configureStore } from "@reduxjs/toolkit";
import WishlistandWatchlist from "../reduxTools/WishlistandWatchlist";
// import TTTest from "../reduxTools/SearchedItems"
// import TTTest from "../reduxTools/SearchedItems";
export default configureStore({
  reducer: {
    userlist: WishlistandWatchlist,
    // test: TTTest,
  },
});
