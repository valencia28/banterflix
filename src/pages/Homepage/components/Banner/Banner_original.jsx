import React from "react";
import "./Banner.style.css";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
          `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[0].poster_path}` +
          ")",
      }}
      className="banner"
    >
      {/* test-white는 부트스트랩에서 가져온 것 */}
      <div className="text-white banner-text-area">
        <div># Current Hit</div>
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
      </div>

      <div className="movie-rating-age">
        <div className="movie-rating">
          <div
            style={{
              backgroundColor: "black",
              width: "22px",
              height: "22px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faStar} style={{ color: "white" }} />
          </div>
          <div>{data?.results[0].vote_average.toFixed(1)}</div>
        </div>
        <div>
          {data?.results[0].adult ? (
            <div
              style={{
                backgroundColor: "red",
                width: "23px",
                height: "23px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 600,
                fontSize: "18px",
                borderRadius: "5px",
              }}
            >
              19
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#DAA520",
                width: "23px",
                height: "23px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 600,
                fontSize: "15px",
                borderRadius: "5px",
              }}
            >
              All
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
