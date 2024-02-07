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
  // user login
  //   cookieeeeeeees
  const localUser: any = localStorage.getItem("user");
  const user = JSON.parse(localUser);

  const [movies, setMovies] = useState(Array);
  const wishred = useSelector(
    (state: unknown | any) => state.userlist.wishMovie
  );

  useEffect(() => {
    const controler = new AbortController();
    const { signal } = controler;
    if (wishred) {
      Promise.all(
        wishred.map((id: any) =>
          axios
            .post("http://localhost:8000/Wishlist", { IDs: id })
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
  }, [wishred]);

  return (
    <>
      <WishWatchPage movies={movies} />
    </>
  );
}
