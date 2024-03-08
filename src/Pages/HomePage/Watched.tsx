import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules

import WishWatchPage from "./components/WishWatchPage";
import { useSelector } from "react-redux";

export default function Watched() {
  // user login
  //   cookieeeeeeees
  // const localUser: any = localStorage.getItem("user");
  // const user = JSON.parse(localUser);

  const [movies, setMovies] = useState(Array);
  const watchred = useSelector((state: unknown | any) => state.userlist.watchMovie);


  useEffect(() => {
    const controler = new AbortController();
    const { signal } = controler;
    if (watchred) {
      Promise.all(
        watchred.map((id: any) =>
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
  }, [watchred]);

  return (
    <>
      <WishWatchPage movies={movies} />
    </>
  );
}
