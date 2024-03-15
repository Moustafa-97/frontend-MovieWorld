import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules
import WishWatchPage from "./components/WishWatchPage";

export default function Wishlist() {
  const [movies, setMovies] = useState(Array);
  const wished = useSelector(
    (state: unknown | any) => state.Login.user.wishMovie
  );

  useEffect(() => {
    const controler = new AbortController();
    const { signal } = controler;
    if (wished) {
      Promise.all(
        wished.map((id: any) =>
          axios
            .post(`${process.env.REACT_APP_SERVER_DOMAIN}/Wishlist`, {
              IDs: id,
            })
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
  }, [wished]);

  return (
    <>
      <WishWatchPage movies={movies} />
    </>
  );
}
