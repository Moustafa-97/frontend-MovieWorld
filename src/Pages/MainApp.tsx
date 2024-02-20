import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
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
export default function MainApp() {
  return (
    <>
      <BrowserRouter basename="*">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Discover" element={<Discover />} />
          <Route path="/Popular" element={<Popular />} />
          <Route path="/Top" element={<TopMovies />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Watched" element={<Watched />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/MovieDetails" element={<MovieDetails />} />
          <Route path="/Search" element={<SearchControl />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
