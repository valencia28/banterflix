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
  const { ref, inView } = useInView();
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useSearchMovieQuery({ keyword });

  console.log("searchData: ", data);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
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

  return (
    <div>
      {/* <h4>Go back</h4> */}
      <h2 style={{ marginLeft: "50px" }}>Search Results</h2>
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

          {data?.pages.map((movie, index) => (
            <Col key={index}>
              <MovieCard movie={movie} />
            </Col>
          ))}
          <Col>
            {isFetchingNextPage ? <p>로딩중</p> : <div ref={ref}></div>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchPage;
