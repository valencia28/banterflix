import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import "animate.css/animate.compat.css";
import ScrollAnimation from "react-animate-on-scroll";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  console.log("ff: ", data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      style={{
        marginTop: "100px",
        boxShadow:
          "0px -15px 25px rgba(255, 255, 255, 0.2), 0px 20px 25px rgba(255, 255, 255, 0.2)",
      }}
    >
      <ScrollAnimation animateIn="fadeInUp" duration="2" delay="500">
        <MovieSlider
          title="Upcoming Films"
          movies={data.results}
          responsive={responsive}
          deviceType="mobile"
        />
      </ScrollAnimation>
    </div>
  );
};

export default UpcomingMovieSlide;
