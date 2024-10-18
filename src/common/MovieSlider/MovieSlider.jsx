import React from "react";
import "./MovieSlider.style.css";
import { Alert } from "bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";

const MovieSlider = ({ title, movies, responsive, deviceType }) => {
  return (
    <div>
      <h3
        style={{
          marginLeft: "30px",
          marginBottom: "0px",
          paddingTop: "10px",
        }}
        className="movie-slider-title"
      >
        {title}
      </h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
        autoPlay={deviceType !== "mobile" ? true : false}
        autoPlaySpeed={2000}
      >
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
