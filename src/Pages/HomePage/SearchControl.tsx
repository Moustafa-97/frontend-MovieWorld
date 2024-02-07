// nagaf 100---300
// bastela 1850 lami3 abyad lon 30 genih (-10%) [2000 LE] -- 45m2
// nadafet ceramic
/**
 sala :: 6*4 --- area= 24 sq / paln 28 m
 oda :: 4*3.5 --- area = 14 / plan = 21
 oda :: 4*3.5 --- area = 14 / plan = 21
 oda :: 4*3.5 --- area = 14 / plan = 21
 safety :: area +5 plan +20
 total == 91+20 plan == 111
*/
import { useEffect, useState } from "react";
import axios from "axios";
// import required modules
import { useSelector } from "react-redux";
import SearchPage from "./components/SearchPage";

export default function SearchControl() {
  // user login
  //   cookieeeeeeees
  const localUser: any = localStorage.getItem("user");
  const user = JSON.parse(localUser);

  const [movies, setMovies] = useState(Array);
  const page = useSelector((state: any) => state.userlist.page);

  const searchType: any | String = localStorage.getItem("search");
  const search: any = JSON.parse(searchType);

  useEffect(() => {
    axios
      .post("http://localhost:8000/search", { page: page, search: search })
      .then((res) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <>
      <SearchPage movies={movies} />
    </>
  );
}
