/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import "react-toastify/dist/ReactToastify.css";
import SnackbarSection from "./snackbar/SnackbarSection";
import WishAndWatchBtn from "./buttons/WishAndWatchBtn";
import Card from "./card/Card";

export default function SwipeCards(props: unknown[] | any) {

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
                      <Card movie={movie} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <SnackbarSection />
    </>
  );
}
