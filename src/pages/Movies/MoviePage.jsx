import React from "react";
import "./MoviePage.style.css";
import { Alert, Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useInView } from "react-intersection-observer";
import NowPlayingMoviesSlide from "./components/NowPlayingMoviesSlide/NowPlayingMoviesSlide";
import { useSortMoviesQuery } from "../../hooks/useSortMovies";

// 정렬 기준에 따른 타이틀 표시
const sortByDisplayName = {
  "popularity.desc": "Popular (High to Low)",
  "popularity.asc": "Popular (Low to High)",
  "original_title.asc": "Title (A-Z)",
  "original_title.desc": "Title (Z-A)",
};

const MoviePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedSortBy, setSelectedSortBy] = useState("popularity.desc");
  const { ref, inView } = useInView();

  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useSortMoviesQuery({ sortBy: selectedSortBy });

  console.log("sortdate: ", data);

  const {
    data: movieGenreData,
    isLoading: genreLoading,
    isError: genreIsError,
    error: genreError,
  } = useMovieGenreQuery();

  //정렬 핸들러
  const handleSortBySelect = (sortKey) => {
    setSelectedSortBy(sortKey);
  };

  //장르 선택 핸들러 - 장르 id
  const handleGenreSelect = (genreId) => {
    if (genreId === "all") {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genreId);
    }
  };

  // 선택된 장르 이름 가져오기
  const selectedGenreName = selectedGenre
    ? movieGenreData?.find((genre) => genre.id === selectedGenre)?.name
    : "Genres";

  // 장르 필터링된 영화
  const genreFilteredMovies = selectedGenre
    ? data?.pages?.filter((movie) =>
        movie.genre_ids ? movie.genre_ids.includes(selectedGenre) : false
      )
    : data?.pages;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading || genreLoading) {
    return <h1>Loading...</h1>;
    // <div>
    //   <Spinner
    //     animation="border"
    //     variant="danger"
    //     style={{ width: "5rem", height: "5rem" }}
    //   />
    //   Loading...
    // </div>
  }
  if (isError || genreIsError) {
    return (
      <Alert variant="danger">{error.message || genreError.message}</Alert>
    );
  }

  return (
    <div>
      <div className="movie-page-title">
        <h2>Films </h2>
        <h4>#Now Playing</h4>
      </div>
      <NowPlayingMoviesSlide />

      <Container className="movies-by-genre-area">
        <Row>
          <Col lg={12} xs={12}>
            <DropdownButton
              id="dropdown-basic-button"
              title={selectedGenreName}
              variant="danger"
            >
              <Dropdown.Item onClick={() => handleGenreSelect("all")}>
                All
              </Dropdown.Item>
              {movieGenreData?.map((genre) => (
                <Dropdown.Item
                  key={genre.id}
                  onClick={() => handleGenreSelect(genre.id)}
                >
                  {genre.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Row style={{ marginTop: "10px" }}>
            <Col lg={12} xs={12}>
              <DropdownButton
                id="dropdown-basic-button"
                title={sortByDisplayName[selectedSortBy]}
                variant="outline-light"
              >
                <Dropdown.Item
                  eventKey="popularity.desc"
                  onClick={() => handleSortBySelect("popularity.desc")}
                >
                  Popular (High to Low)
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="popularity.asc"
                  onClick={() => handleSortBySelect("popularity.asc")}
                >
                  Popular (Low to High)
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="original_title.asc"
                  onClick={() => handleSortBySelect("original_title.asc")}
                >
                  Title (A-Z)
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="original_title.desc"
                  onClick={() => handleSortBySelect("original_title.desc")}
                >
                  Title (Z-A)
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        </Row>

        <Row className="movies-by-genre">
          {genreFilteredMovies?.length ? (
            genreFilteredMovies.map((movie, index) => (
              <Col lg={3} md={4} xs={12} key={index}>
                <MovieCard movie={movie} />
              </Col>
            ))
          ) : (
            <Col>No movies found for this genre</Col>
          )}
          <Col>
            {isFetchingNextPage ? <p>로딩중</p> : <div ref={ref}></div>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;
