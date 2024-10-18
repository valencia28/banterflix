import React from "react";
import { useNowPlayingMoviesQuery } from "../../../../hooks/useNowPlayingMovies";
import { Alert } from "react-bootstrap";
import { bigResponsive } from "../../../../constants/responsive";
import BigMovieSlider from "../../../../common/MovieSlider/BigMovieSlider";

const NowPlayingMoviesSlide = () => {
  const { data, isError, isLoading, error } = useNowPlayingMoviesQuery();
  console.log("nowPlaying: ", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <BigMovieSlider title="" movies={data} responsive={bigResponsive} />
    </div>
  );
};

export default NowPlayingMoviesSlide;
