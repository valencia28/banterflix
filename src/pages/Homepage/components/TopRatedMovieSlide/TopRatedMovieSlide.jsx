import React from "react";
import { useTopRatedMovieQuery } from "../../../../hooks/useTopRatedMovies";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import "animate.css/animate.compat.css";
import ScrollAnimation from "react-animate-on-scroll";

const TopRatedMovieSlide = ({ topRatedMovies }) => {
  return (
    <div style={{ marginTop: "100px" }}>
      <ScrollAnimation animateIn="fadeInUp" duration="2" delay="500">
        <MovieSlider
          title="Top Rated Films"
          movies={topRatedMovies}
          responsive={responsive}
          deviceType="mobile"
        />
      </ScrollAnimation>
    </div>
  );
};

export default TopRatedMovieSlide;
