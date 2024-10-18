import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";

//1. 배너 -> popular movie를 들고와서 첫 번재 아이템 보여주기
//2. popular movie
//3. top rated movie
//4. upcoming movie
const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <UpcomingMovieSlide />
      <TopRatedMovieSlide />
    </div>
  );
};

export default Homepage;
