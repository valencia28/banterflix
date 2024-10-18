import React from "react";
import "./Banner.style.css";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import { Container } from "react-bootstrap";
import Typewriter from "typewriter-effect";

const Banner = () => {
  //usePopularMoviesQuery는 useQuery로 쓰였기 때문에 {data} 등을 반환함
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("data: ", data);

  //로딩 스피너 추후에 넣기 - 부트스트랩 등
  //if 구문에 return을 쓰지 않으면 아래쪽 url부분에 ${data?.results[0].poster_pat}로 적어야 함
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  //Banner라는 글자를 써야지만 이미지가 backgroundImage로써 보여짐!
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
