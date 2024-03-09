/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DoneAll } from "@mui/icons-material";
import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
  AddRemoveMovieWatch,
  AddRemoveMovieWish,
} from "../../redux/reduxTools/WishlistandWatchlist";
import "react-toastify/dist/ReactToastify.css";
import { Snackbar } from "@mui/material";
export default function SwipeCards(props: unknown[] | any) {
  const navigate = useNavigate();

  // user wishWatch
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

  const [wishWatchresp, setwishWatchresp] = useState(Object);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(wishMovie).length !== 0) {
      axios
        .put(
          `${process.env.REACT_APP_SERVER_DOMAIN}/AddRemoveWish`,
          {
            wishMovie: wishMovie,
            id: user?._id,
          },
        )
        .then((res) => {
          if (res.data.state) {
            localStorage.setItem("user", JSON.stringify(res.data.data));
            setwishWatchresp(res.data);
            setSnackOpen(true);
          } else {
            setwishWatchresp(res.data);
            setSnackOpen(true);
          }
        })
        .catch((err) => console.log(err));
    }
    return;
  }, [wishMovie, click]);

  // watch

  useEffect(() => {
    if (Object.keys(watchedMovie).length !== 0) {
      axios
        .put(`${process.env.REACT_APP_SERVER_DOMAIN}/AddRemoveWatch`, {
          watchedMovie: watchedMovie,
          id: user?._id,
        })
        .then((res) => {
          if (res.data.state) {
            localStorage.setItem("user", JSON.stringify(res.data.data));
            setwishWatchresp(res.data);
            setSnackOpen(true);
          } else {
            setwishWatchresp(res.data);
            setSnackOpen(true);
          }
        })
        .catch((err) => console.log(err));
    }
    return;
  }, [watchedMovie, clickx]);
  //  mui
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: String
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <>
      <div key={Math.random()}>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 1,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 2,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
          }}
          pagination={{
            clickable: true,
          }}
          navigation
          modules={[Navigation, Pagination]}
          className="mySwiper "
          loop
          key={Math.random()}
        >
          {props.movies &&
            props.movies.map((movie: String | Object | any) => (
              <SwiperSlide className="dark:bg-black bg-slate-500 pb-5 rounded-md shadow-md">
                <div
                  key={Math.random()}
                  className="container cont-item lg:w-full sm:w-full rounded-md z-10"
                >
                  <div key={Math.random()}>
                    <div key={Math.random()} className="relative">
                      {/* card */}
                      <div
                        key={Math.random()}
                        className="cursor-pointer"
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
                        <div className="mt-3">
                          <p
                            className="text-xl text-start text-slate-50 dark:text-slate-400 ms-2 mb-2 font-bold whitespace-nowrap overflow-hidden w-[94%]"
                            key={Math.random()}
                          >
                            {movie.name ? movie.name : movie.title}
                          </p>
                          <p
                            className=" text-xs font-light text-start ms-2 text-slate-50 dark:text-slate-400"
                            key={Math.random()}
                          >
                            {movie.overview.slice(0, 60) + "..."}
                          </p>
                          <p
                            className="absolute text-black dark:text-slate-300 dark:bg-black bg-white top-4 left-2  rounded-md px-1 text-xs flex gap-1 items-center justify-center"
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
                                ? "z-[5000px] rounded-[50%] dark:bg-yellow-200 bg-yellow-200 px-2 py-1 text-2xl text-center m-auto mr-2"
                                : " z-[5000px] rounded-[50%] text-black dark:text-slate-300 dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
                              : " z-[5000px] rounded-[50%] text-black dark:text-slate-300 dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
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
                                ? "z-[5000px] rounded-[50%] dark:bg-yellow-200 bg-yellow-200 px-2 py-1 text-2xl text-center m-auto mr-2"
                                : " z-[5000px] rounded-[50%] text-black dark:text-slate-300 dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
                              : " z-[5000px] rounded-[50%] text-black dark:text-slate-300 dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
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
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div key={Math.random()}>
        <Snackbar
          message={wishWatchresp.message}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackOpen}
          onClose={handleClose}
        />
      </div>
    </>
  );
}
