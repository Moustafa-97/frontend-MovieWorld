import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
} from "react";
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Scrollbar } from "swiper/modules";
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DoneAll } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  AddRemoveMovieWatch,
  AddRemoveMovieWish,
} from "../../redux/reduxTools/WishlistandWatchlist";

export default function SearchPage(props: any) {
  const navigate = useNavigate();

  // user login
  //   cookieeeeeeees
  const localUser: any = localStorage.getItem("user");
  const user = JSON.parse(localUser);

  const [wishMovie, setWishMovie] = useState(Object);
  const [watchedMovie, setWatchedMovie] = useState(Object);

  const [click, setClick] = useState(false);
  const [clickx, setClickx] = useState(false);
  // redux
  const userWish = useSelector(
    (state: unknown | any) => state.userlist.wishMovie
  );
  const userWatch = useSelector(
    (state: unknown | any) => state.userlist.watchMovie
  );

  const dispatch = useDispatch();

  const handleWishAddRemove = useCallback((movie: Object | any) => {
    setWishMovie(movie);
    setClick((pre) => !pre);
    dispatch(AddRemoveMovieWish(movie));

    return;
  }, []);
  const handleWatchAddRemove = useCallback((moviex: Object | any) => {
    setWatchedMovie(moviex);
    setClickx((pre) => !pre);
    dispatch(AddRemoveMovieWatch(moviex));

    return;
  }, []);
  const inWish = userWish?.map((Movieid: any) => Movieid);
  const inWatch = userWatch?.map((Movieid: any) => Movieid);
  const logedUser: Object | null | any = localStorage.getItem("user");

  useEffect(() => {
    if (Object.keys(wishMovie).length !== 0 && logedUser) {
      axios
        .put(`${process.env.REACT_APP_SERVER_DOMAIN}/AddRemoveWish`, {
          wishMovie: wishMovie,
          id: user?._id,
        })
        .then((res) => {
          localStorage.setItem("wishlist", JSON.stringify(res.data.data));
        })
        .catch((err) => console.log(err));

      return;
    }
  }, [wishMovie, click]);

  // watch

  useEffect(() => {
    if (Object.keys(watchedMovie).length !== 0 && logedUser) {
      axios
        .put(`${process.env.REACT_APP_SERVER_DOMAIN}/AddRemoveWatch`, {
          watchedMovie: watchedMovie,
          id: user?._id,
        })
        .then((res) => {
          localStorage.setItem("watchedlist", JSON.stringify(res.data.data));
        })
        .catch((err) => console.log(err));

      return;
    }
  }, [watchedMovie, clickx]);

  return (
    <>
      <div className="container absolute top-10 pb-20">
        <div className="flex flex-wrap items-center justify-start mt-10">
          {props.movies && props.movies ? (
            props.movies.map((movie: any) => (
              <div
                key={Math.random()}
                className="container cont-item lg:w-1/3 sm:w-full p-2 shadow-md rounded-md z-10"
              >
                <div className="" key={Math.random()}>
                  <div key={Math.random()} className="relative">
                    {/* card */}
                    <div
                      key={Math.random()}
                      className=" cursor-pointer"
                      onClick={() => {
                        localStorage.setItem("movieid", movie.id);
                        navigate("/MovieDetails");
                      }}
                    >
                      {/* img */}
                      <div key={Math.random()} className=" relative">
                        <img
                          key={Math.random()}
                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                          alt="movie"
                          className="rounded-md shadow-xl object-cover "
                        />
                      </div>
                      {/* details */}
                      <div>
                        <p
                          className="text-xl font-bold whitespace-nowrap overflow-hidden w-[94%]"
                          key={Math.random()}
                        >
                          {movie.name? movie.name : movie.title}
                        </p>

                        <p className=" text-xs font-light" key={Math.random()}>
                          {movie.overview.slice(0, 60) + "..."}
                        </p>
                        <p
                          className="absolute dark:bg-black bg-white top-4 left-2  rounded-md px-1 text-xs flex gap-1 items-center justify-center"
                          key={Math.random()}
                        >
                          <FaRegStar />
                          {movie.vote_average}
                        </p>
                      </div>
                    </div>
                    {/* buttons */}
                    <div
                      key={Math.random()}
                      className="absolute top-2 right-2 z-[50px]"
                    >
                      <button
                        key={Math.random()}
                        className={
                          user
                            ? inWatch?.includes(movie.id)
                              ? "z-[5000px] rounded-[50%] dark:bg-yellow-200 bg-slate-500 px-2 py-1 text-2xl text-center m-auto mr-2"
                              : " z-[5000px] rounded-[50%] dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
                            : " z-[5000px] rounded-[50%] dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
                        }
                        onClick={() => {
                          handleWatchAddRemove(movie);
                        }}
                      >
                        <DoneAll fontSize="small" />
                      </button>
                      <button
                        key={Math.random()}
                        className={
                          user
                            ? inWish?.includes(movie.id)
                              ? "z-[5000px] rounded-[50%] dark:bg-yellow-200 bg-slate-500 px-2 py-1 text-2xl text-center m-auto mr-2"
                              : " z-[5000px] rounded-[50%] dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
                            : " z-[5000px] rounded-[50%] dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
                        }
                        onClick={() => {
                          handleWishAddRemove(movie);
                        }}
                      >
                        <FaRegStar />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center" key={Math.random()}>
              <div role="status" key={Math.random()}>
                <svg
                  key={Math.random()}
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    key={Math.random()}
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    key={Math.random()}
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only" key={Math.random()}>
                  Loading...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
