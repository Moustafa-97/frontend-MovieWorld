import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login-Signup/Login";
import SignUp from "./Login-Signup/Signup";
import HomePage from "./HomePage/HomePage";
import Discover from "./HomePage/Discover";
import MovieDetails from "./Movie/MovieDetails";
import Wishlist from "./HomePage/Wishlist";
import Watched from "./HomePage/Watched";
import Popular from "./HomePage/Popular";
import TopMovies from "./HomePage/TopMovies";
import SearchControl from "./HomePage/SearchControl";
import Layout from "./Layout/Layout";
import Profile from "./Profile/Profile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userData } from "./redux/reduxTools/HandleUserLogin";
export default function MainApp() {
  const logedUser: Object | any = localStorage.getItem("user");
  const logedUserD = JSON.parse(logedUser);
  const logedUserID = logedUserD;
  const dispatch = useDispatch();
  useEffect(() => {
    if (logedUserID) {
      axios
        .post(`${process.env.REACT_APP_SERVER_DOMAIN}/refresh`, {
          token: logedUserID,
        })
        .then((res: object | any | null) => {
          dispatch(userData(res.data.data));
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Discover" element={<Discover />} />
            <Route path="/Popular" element={<Popular />} />
            <Route path="/Top" element={<TopMovies />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/Watched" element={<Watched />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/MovieDetails/:id" element={<MovieDetails />} />
            <Route path="/Search/:search" element={<SearchControl />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}
