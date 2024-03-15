import React, { useEffect, useState } from "react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules

import WishWatchPage from "./components/WishWatchPage";
import { useSelector } from "react-redux";

export default function Watched() {
  const [movies, setMovies] = useState(Array);
  const watched = useSelector(
    (state: unknown | any) => state.Login.user.watched
  );

  useEffect(() => {
    const controler = new AbortController();
    const { signal } = controler;
    if (watched) {
      Promise.all(
        watched.map((id: any) =>
          axios
            .post(`${process.env.REACT_APP_SERVER_DOMAIN}/Watched`, { IDs: id })
            .then((res) => {
              return res.data.thisMovie;
            })
            .catch((err) => {
              if (!signal.aborted) {
                console.log(err);
              }
            })
        )
      ).then((results) => setMovies(results));
    }

    return () => {
      controler.abort();
    };
  }, [watched]);

  return (
    <>
      <WishWatchPage movies={movies} />
    </>
  );
}
