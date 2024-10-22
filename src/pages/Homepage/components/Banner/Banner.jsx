import React from "react";
import "./Banner.style.css";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import { Container } from "react-bootstrap";
import Typewriter from "typewriter-effect";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("data: ", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://www.geo.tv/assets/uploads/updates/2023-11-19/519544_2956844_updates.jpg` +
          ")",
      }}
      className="banner"
    >
      <Container className="banner-text-area">
        <Typewriter
          options={{
            strings: ["BANTERFLIX"],
            autoStart: true,
            loop: true,
            wrapperClassName: "banner-title",
            cursorClassName: "banner-title-cursor",
            delay: 200,
          }}
        />
        <p>All the Films, All the Fun, All in One Place</p>
      </Container>
    </div>
  );
};

export default Banner;
