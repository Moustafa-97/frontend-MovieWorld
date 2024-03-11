/* eslint-disable react-hooks/exhaustive-deps */
import { DoneAll } from "@mui/icons-material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  AddRemoveMovieWish,
  AddRemoveMovieWatch,
} from "../../../redux/reduxTools/WishlistandWatchlist";
import { setMessage, setOpen } from "../../../redux/reduxTools/SnackbarHandler";
export default function WishAndWatchBtn(props: any) {
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
            dispatch(setMessage(res.data));
            dispatch(setOpen(true));
          } else {
            dispatch(setMessage(res.data));
            dispatch(setOpen(true));
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
            dispatch(setMessage(res.data));
            dispatch(setOpen(true));
          } else {
            dispatch(setMessage(res.data));
            dispatch(setOpen(true));
          }
        })
        .catch((err) => console.log(err));
    }
    return;
  }, [watchedMovie, clickx]);

  return (
    <>
      <div key={Math.random()} className="absolute top-2 right-2 z-[50px]">
        <button
          key={Math.random()}
          className={
            user
              ? inWatch?.includes(props.movie.id)
                ? "z-[5000px] rounded-[50%] dark:bg-yellow-200 bg-yellow-200 px-2 py-1 text-2xl text-center m-auto mr-2"
                : " z-[5000px] rounded-[50%] text-black dark:text-slate-300 dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
              : " z-[5000px] rounded-[50%] text-black dark:text-slate-300 dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
          }
          onClick={() => {
            handleWatchAddRemove(props.movie);
          }}
        >
          <DoneAll fontSize="small" />
        </button>
        <button
          key={Math.random()}
          className={
            user
              ? inWish?.includes(props.movie.id)
                ? "z-[5000px] rounded-[50%] dark:bg-yellow-200 bg-yellow-200 px-2 py-1 text-2xl text-center m-auto mr-2"
                : " z-[5000px] rounded-[50%] text-black dark:text-slate-300 dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
              : " z-[5000px] rounded-[50%] text-black dark:text-slate-300 dark:bg-black bg-white px-2 py-1 text-2xl text-center m-auto mr-2"
          }
          onClick={() => {
            handleWishAddRemove(props.movie);
          }}
        >
          <FaRegStar />
        </button>
      </div>
    </>
  );
}
