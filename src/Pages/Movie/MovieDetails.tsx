/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCalendar, FaRegStar } from "react-icons/fa";
import {
  AddRemoveMovieWatch,
  AddRemoveMovieWish,
} from "../redux/reduxTools/WishlistandWatchlist";
import { useDispatch, useSelector } from "react-redux";
import { DoneAll } from "@mui/icons-material";
import { Snackbar } from "@mui/material";

export default function MovieDetails() {
  const [movie, setMovie] = React.useState(Object);
  const id = useParams();
  // const test: String | Number | null | any = localStorage.getItem("movieid");
  // const theid = JSON.parse(test);
  // get movie details
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/Moviedetails `, {
        id: id.id,
      })
      .then((res) => setMovie(res.data.thisMovie))
      .catch((err) => console.log(err));
  }, []);

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

  const [wishWatchresp, setwishWatchresp] = useState(Object);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(wishMovie).length !== 0) {
      axios
        .put(`${process.env.REACT_APP_SERVER_DOMAIN}/AddRemoveWish`, {
          wishMovie: wishMovie,
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
      <div className=" lg:flex items-start justify-start absolute top-20 m-auto w-full">
        {/* pic */}
        <div className=" lg:w-1/4 w-full">
          <img
            key={Math.random()}
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="movie"
            className="rounded-md shadow-xl object-cover "
          />
        </div>
        {/* details section */}
        <div className=" lg:w-2/4 w-full">
          {/* data */}
          <div className="m-auto px-6">
            <p
              className="top-4 left-2 rounded-md p-1 text-md flex gap-1 items-center justify-start"
              key={Math.random()}
            >
              <FaRegStar />
              {movie.vote_average}
            </p>
            <p
              className="top-4 left-2 rounded-md p-1 text-md flex gap-1 items-center justify-start"
              key={Math.random()}
            >
              <FaCalendar />
              {movie.release_date}
            </p>
            <p
              className=" lg:text-6xl text-4xl text-wrap py-3 font-bold whitespace-nowrap overflow-hidden w-[94%]"
              key={Math.random()}
            >
              {movie.title}
            </p>

            <p className=" text-xl font-light" key={Math.random()}>
              {movie.overview}
            </p>
          </div>
          {/* buttons */}
          <div key={Math.random()} className="py-6 text-center">
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
        {/* poster */}
        <div className=" lg:w-1/4 w-full">
          <img
            key={Math.random()}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="movie"
            className="rounded-md shadow-xl object-cover "
          />
        </div>
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
