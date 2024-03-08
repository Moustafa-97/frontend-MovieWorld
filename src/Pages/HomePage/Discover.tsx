import { useEffect, useState } from "react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules
import SinglePage from "./components/SinglePage";
import { useSelector } from "react-redux";

declare var process : {
  env: {
    REACT_APP_SERVER_DOMAIN: string
  }
}
export default function Discover() {
  // user login
  //   cookieeeeeeees
  // const localUser: any = localStorage.getItem("user");
  // const user = JSON.parse(localUser);

  const [movies, setMovies] = useState(Array);
  const page = useSelector((state: any) => state.userlist.page);

  
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/Discover`, { page: page })
      .then((res) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMovies(res.data.movies.results);
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <>
      <SinglePage movies={movies} />
    </>
  );
}
