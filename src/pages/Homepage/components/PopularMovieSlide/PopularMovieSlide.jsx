import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import "animate.css/animate.compat.css";
import ScrollAnimation from "react-animate-on-scroll";

const PopularMovieSlide = ({ popularMovies }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <ScrollAnimation animateIn="fadeInUp" duration="2">
        <MovieSlider
          title="Popular Films"
          movies={popularMovies}
          responsive={responsive}
          deviceType="mobile"
        />
      </ScrollAnimation>
    </div>
  );
};

export default PopularMovieSlide;
