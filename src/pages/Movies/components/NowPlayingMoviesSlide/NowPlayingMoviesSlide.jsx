import React from "react";
import { useNowPlayingMoviesQuery } from "../../../../hooks/useNowPlayingMovies";
import { Alert } from "react-bootstrap";
import { bigResponsive } from "../../../../constants/responsive";
import BigMovieSlider from "../../../../common/MovieSlider/BigMovieSlider";
import MoonLoader from "react-spinners/ClipLoader";

const NowPlayingMoviesSlide = () => {
  const { data, isError, isLoading, error } = useNowPlayingMoviesQuery();

  /*Loading spinner style*/
  const override: CSSProperties = {
    display: "block",
    margin: "23vh auto",
    borderColor: "red",
  };

  if (isLoading) {
    return (
      <MoonLoader
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
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
