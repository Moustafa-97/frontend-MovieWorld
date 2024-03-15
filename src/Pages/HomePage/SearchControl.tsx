/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
// import required modules
import { useSelector } from "react-redux";
import SearchPage from "./components/SearchPage";
import { useParams } from "react-router-dom";

export default function SearchControl() {
  const [movies, setMovies] = useState(Array);
  const page = useSelector((state: any) => state.userlist.page);

  const search = useParams();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/search`, {
        page: page,
        search: search.search,
      })
      .then((res) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMovies(res.data.results);
        console.log(res.data.results);
        
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <>
      <SearchPage movies={movies} />
    </>
  );
}
