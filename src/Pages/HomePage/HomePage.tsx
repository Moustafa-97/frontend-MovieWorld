import React, { useEffect, useState } from "react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// components
import SwiperCards from "./components/SwipeCards";
// AOS ANIMATION
import AOS from "aos";
import "aos/dist/aos.css";
import ScreenSwiper from "./components/ScreenSwiper";

export default function Discover() {
  // AOS ANIMATION
  AOS.init();

  const [popularMovies, setPopularMovies] = useState(Array);
  const [trendingMovies, setTrendingMovies] = useState(Array);
  const page = 1;
  // popular
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/Popular`, { page: page })
      .then((res) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setPopularMovies(res.data.movies.results);
      })
      .catch((err) => console.log(err));
  }, []);

  // trending
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/Trending`, { page: page })
      .then((res) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTrendingMovies(res.data.movies.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
          <ScreenSwiper movies={popularMovies} />
      </div>
      {/* popular */}
      <div className=" mt-10" data-aos="fade-up">
        <div>
          <h3 className="dark:text-white text-black ms-3 mb-4 font-semibold text-lg">
            Popular
          </h3>
        </div>
        <div>
          <SwiperCards movies={popularMovies} />
        </div>
      </div>
      {/* trending */}
      <div className=" mt-10" data-aos="fade-up">
        <div>
          <h3 className="dark:text-white text-black ms-3 mb-4 font-semibold text-lg">
            Trending
          </h3>
        </div>
        <div>
          <SwiperCards movies={trendingMovies} />
        </div>
      </div>
      {/* trending */}
      <div className=" mt-10" data-aos="fade-up">
        <div>
          <h3 className="dark:text-white text-black ms-3 mb-4 font-semibold text-lg">
            Trending
          </h3>
        </div>
        <div>
          <SwiperCards movies={trendingMovies} />
        </div>
      </div>
    </>
  );
}
