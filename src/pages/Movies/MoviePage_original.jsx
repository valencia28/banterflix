import React from "react";
import "./MoviePage.style.css";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useInView } from "react-intersection-observer";
import NowPlayingMoviesSlide from "./components/NowPlayingMoviesSlide/NowPlayingMoviesSlide";

//moviePage에 올 수 있는 경우 2가지
//1. nav 바에서 클릭해서 온 경우 => popularMovie 보여주기 ->이런 부분은 보통 백엔드 파트
//2. keyword를 입력해서 온 경우 => keyword와 관련된 영화 보여줌

const MoviePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  //const [page, setPage] = useState(1);
  const [selectedSortBy, setSelectedSortBy] = useState("popularity.desc");
  const { ref, inView } = useInView();

  //키워드가 url에 있기 때문에 url에서 쿼리값 읽어오기
  //const [query, setQuery] = useSearchParams();
  //const keyword = query.get("q");

  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useSearchMovieQuery({ sortBy: selectedSortBy });
  //useSearchMovieQuery({ keyword, sortBy: selectedSortBy });

  const {
    data: movieGenreData,
    isLoading: genreLoading,
    isError: genreIsError,
    error: genreError,
  } = useMovieGenreQuery();
  //console.log("MoviePage genre: ", movieGenreData);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  // useEffect(() => {
  //   // 검색 및 정렬 조건이 변경되면 첫 페이지를 다시 요청
  //   if (keyword) {
  //     setQuery({ q: keyword });
  //   }
  // }, [keyword, selectedSortBy, setQuery]);

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
  //장르 선택 핸들러
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

  // 영화 정렬 기준에 따른 타이틀 표시
  const sortByDisplayName = {
    "popularity.desc": "Popular (High to Low)",
    "popularity.asc": "Popular (Low to High)",
    "original_title.asc": "Title (A-Z)",
    "original_title.desc": "Title (Z-A)",
  };

  const handleSortBySelect = (sortKey) => {
    setSelectedSortBy(sortKey);
  };

  //useInfiniteQuery 코드 - 장르 필터링된 영화
  const genreFilteredMovies = selectedGenre
    ? data.pages.filter((movie) =>
        movie.genre_ids ? movie.genre_ids.includes(selectedGenre) : false
      )
    : data.pages;

  return (
    <div>
      <div className="movie-page-title">
        <h2>Movies </h2>
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
          {/* {data?.results.map((movie, index) => (
            <Col key={index}>
              <MovieCard movie={movie} />
            </Col>
          ))} */}

          {genreFilteredMovies?.length ? (
            genreFilteredMovies.map((movie, index) => (
              <Col key={index}>
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

//기존 useQuery 코드
// const { data, isLoading, isError, error } = useSearchMovieQuery(
//   {
//     keyword,
//     page,
//   },
//   { keepPreviousData: true }
// );
// console.log("MoviePage.jsx data: ", data);

//기존 useQuery 코드
// const genreFilteredMovies = selectedGenre
//   ? data.results.filter((movie) => movie.genre_ids.includes(selectedGenre))
//   : data.results;
