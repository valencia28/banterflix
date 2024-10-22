import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import "animate.css/animate.compat.css";
import ScrollAnimation from "react-animate-on-scroll";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div style={{ marginTop: "30px" }}>
      <ScrollAnimation animateIn="fadeInUp" duration="2">
        <MovieSlider
          title="Popular Films"
          movies={data.results}
          responsive={responsive}
          deviceType="mobile"
        />
      </ScrollAnimation>
    </div>
  );
};

export default PopularMovieSlide;
