import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import { usePopularMoviesQuery } from "../../hooks/usePopularMovies";
import { useUpcomingMoviesQuery } from "../../hooks/useUpcomingMovies";
import { useTopRatedMovieQuery } from "../../hooks/useTopRatedMovies";
import { Alert } from "react-bootstrap";
import MoonLoader from "react-spinners/ClipLoader";

const Homepage = () => {
  const {
    data: popularMoviesData,
    isLoading: popularMoviesIsLoading,
    isError: popularMoviesIsError,
    error: popularMoviesError,
  } = usePopularMoviesQuery();

  const {
    data: upcomingMoviesData,
    isLoading: upcomingMoviesIsLoading,
    isError: upcomingMoviesIsError,
    error: upcomingMoviesError,
  } = useUpcomingMoviesQuery();

  const {
    data: topRatedMoviesData,
    isLoading: topRatedMoviesIsLoading,
    isError: topRatedMoviesIsError,
    error: topRatedMoviesError,
  } = useTopRatedMovieQuery();

  const isLoading =
    popularMoviesIsLoading ||
    upcomingMoviesIsLoading ||
    topRatedMoviesIsLoading;
  const isError =
    popularMoviesIsError || upcomingMoviesIsError || topRatedMoviesIsError;

  /*Loading spinner style*/
  const override: CSSProperties = {
    display: "block",
    margin: "30vh auto",
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
    return (
      <Alert variant="danger">
        {popularMoviesError || upcomingMoviesError || topRatedMoviesError}
      </Alert>
    );
  }

  return (
    <div>
      <Banner />
      <PopularMovieSlide popularMovies={popularMoviesData.results} />
      <UpcomingMovieSlide upcomingMovies={upcomingMoviesData.results} />
      <TopRatedMovieSlide topRatedMovies={topRatedMoviesData.results} />
    </div>
  );
};

export default Homepage;
