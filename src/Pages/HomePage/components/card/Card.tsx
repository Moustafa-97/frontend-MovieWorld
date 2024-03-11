import React from "react";
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Card(props: object | any) {
  const navigate = useNavigate();
  return (
    <div
      key={Math.random()}
      className="cursor-pointer"
      onClick={() => {
        navigate(`/MovieDetails/${props.movie.id}`);
      }}
    >
      {/* img */}
      <div key={Math.random()} className=" relative">
        <img
          key={Math.random()}
          src={`https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`}
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
          {props.movie.name ? props.movie.name : props.movie.title}
        </p>
        <p
          className=" text-xs font-light text-start ms-2 text-slate-50 dark:text-slate-400"
          key={Math.random()}
        >
          {props.movie.overview.slice(0, 60) + "..."}
        </p>
        <p
          className="absolute text-black dark:text-slate-300 dark:bg-black bg-white top-4 left-2  rounded-md px-1 text-xs flex gap-1 items-center justify-center"
          key={Math.random()}
        >
          <FaRegStar />
          {props.movie.vote_average}
        </p>
      </div>
    </div>
  );
}
