import React from "react";
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

const SearchPage = () => {
  //const [selectedGenre, setSelectedGenre] = useState(null);
  //const [page, setPage] = useState(1);
  //const [selectedSortBy, setSelectedSortBy] = useState("popularity.desc");
  const { ref, inView } = useInView();

  //키워드가 url에 있기 때문에 url에서 쿼리값 읽어오기
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useSearchMovieQuery({ keyword });

  console.log("searchData: ", data);

  //   const {
  //     data: movieGenreData,
  //     isLoading: genreLoading,
  //     isError: genreIsError,
  //     error: genreError,
  //   } = useMovieGenreQuery();
  //console.log("MoviePage genre: ", movieGenreData);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    // 검색 및 정렬 조건이 변경되면 첫 페이지를 다시 요청
    if (keyword) {
      setQuery({ q: keyword });
    }
  }, [keyword, setQuery]);

  if (isLoading) {
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
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  //   //장르 선택 핸들러
  //   const handleGenreSelect = (genreId) => {
  //     if (genreId === "all") {
  //       setSelectedGenre(null);
  //     } else {
  //       setSelectedGenre(genreId);
  //     }
  //   };

  //   // 선택된 장르 이름 가져오기
  //   const selectedGenreName = selectedGenre
  //     ? movieGenreData?.find((genre) => genre.id === selectedGenre)?.name
  //     : "Genres";

  //   // 영화 정렬 기준 선택 핸들러
  //   const handleSortBySelect = (sortKey) => {
  //     setSelectedSortBy(sortKey);
  //   };

  //   //useInfiniteQuery 코드 - 장르 필터링된 영화
  //   const genreFilteredMovies = selectedGenre
  //     ? data.pages.filter((movie) =>
  //         movie.genre_ids ? movie.genre_ids.includes(selectedGenre) : false
  //       )
  //     : data.pages;

  return (
    <div>
      <h4>Go back</h4>
      <h2>Search Results</h2>
      <Container>
        <div></div>
        <Row>
          {data?.pages?.length ? (
            data.pages.map((movie, index) => (
              <Col key={index}>
                <MovieCard movie={movie} />
              </Col>
            ))
          ) : (
            <Col>No movies found for this search term</Col>
          )}

          {data?.pages.map(
            (movie, index) => (
              <Col key={index}>
                <MovieCard movie={movie} />
              </Col>
            )

            // <Col>No movies found for this genre</Col>
          )}
          <Col>
            {isFetchingNextPage ? <p>로딩중</p> : <div ref={ref}></div>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchPage;
