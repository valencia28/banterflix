import React from "react";
import "./BigMovieSlider.style.css";
import { Alert } from "bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BigMovieCard from "../MovieCard/BigMovieCard";

const MovieSlider = ({ title, movies, responsive, deviceType }) => {
  return (
    <div>
      <h4
        style={{
          marginLeft: "30px",
          marginBottom: "0px",
        }}
        className="movie-slider-title"
      >
        {title}
      </h4>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="big-movie-slider p-1"
        containerClass="big-carousel-container"
        autoPlay={deviceType !== "mobile" ? true : false}
        autoPlaySpeed={3000}
        responsive={responsive}
      >
        {movies.map((movie, index) => (
          <BigMovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
