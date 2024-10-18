import React from "react";
import "./MovieDetailPage.style.css";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useParams } from "react-router-dom";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "react-bootstrap";
import YouTube from "react-youtube";
import { useMovieVideoQuery } from "../../hooks/useMovieVedio";
import { useSimilarMoviesQuery } from "../../hooks/useSimilarMovies";
import MovieSlider from "../../common/MovieSlider/MovieSlider";
import { responsive } from "../../constants/responsive";

const MovieDetailPage = () => {
  //각 영화 id 가져오기
  const { id } = useParams();

  const { data, isLoading, isError, error } = useMovieDetailQuery({
    movieId: id,
  });

  const {
    data: videoData,
    isLoading: videoIsLoading,
    isError: videoIsError,
    error: videoError,
  } = useMovieVideoQuery({ movieId: id });

  const {
    data: similarData,
    isLoading: similarIsLoading,
    isError: similarIsError,
    error: similarError,
  } = useSimilarMoviesQuery({ movieId: id });

  console.log("similar: ", similarData);

  //받은 데이터 중 key 값을 Youtube 비디오로 전달
  const latestTeaser =
    videoData
      ?.filter((video) => video.type.toLowerCase() === "trailer")
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))[0] ||
    videoData?.[0];

  const movieKey = latestTeaser ? latestTeaser.key : null;

  //유튜브 비디오 관련
  const opts = {
    width: "85%",
    height: "85%",
    // playerVars: {
    //   autoplay: 1,
    // },
  };

  if (isLoading || videoIsLoading || similarIsLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError || videoIsError || similarError) {
    return (
      <Alert variant="danger">
        {error.message || videoError.message || similarError.message}
      </Alert>
    );
  }

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.poster_path}` +
          ")",
      }}
      className="movie-detail-background "
    >
      <div className="detail-overlay"></div>

      <div className="for-top-margin"></div>

      <div className="detail-text-area">
        <Container>
          <Row>
            <Col>
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path}`}
                alt={data?.title}
                className="detail-poster"
              />
            </Col>
            <Col>
              <h1 className="movie-detail-title">{data?.title}</h1>
              <div className="movie-detail-release-date-age-info">
                <div>{data?.release_date?.substring(0, 4)}</div>
                <div>
                  {data?.adult ? (
                    <div
                      style={{
                        backgroundColor: "red",
                        width: "38px",
                        height: "38px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 600,
                        fontSize: "27px",
                        borderRadius: "5px",
                      }}
                    >
                      19
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#DAA520",
                        width: "38px",
                        height: "38px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 600,
                        fontSize: "27px",
                        borderRadius: "5px",
                      }}
                    >
                      All
                    </div>
                  )}
                </div>
              </div>
              <div className="movie-detail-rating">
                <div
                  style={{
                    backgroundColor: "black",
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faStar} style={{ color: "white" }} />
                </div>
                <div>{data?.vote_average?.toFixed(1)}</div>
              </div>

              <div className="movie-detail-overview">{data?.overview}</div>
              {data?.genres?.flatMap((genre) => (
                <Badge bg="danger" className="movie-detail-genre">
                  {genre.name}
                </Badge>
              ))}
            </Col>
          </Row>

          <div className="trailer-area">
            <div>
              <h1 className="trailer-title">Trailer</h1>
              <div className="player">
                <YouTube
                  videoId={movieKey}
                  opts={opts}
                  className="position-class iframe"
                />
              </div>
            </div>
          </div>
        </Container>
        <div className="similar-movies-area">
          <div
            style={{
              marginLeft: "30px",
              paddingTop: "10px",
              fontSize: "20px",
              fontStyle: "italic",
            }}
          >
            #Similar Films
          </div>
          <MovieSlider title="" movies={similarData} responsive={responsive} />
        </div>

        {/* <Container>
          <Row>
            <Col>
              리뷰
            </Col>
          </Row>
        </Container> */}
      </div>
    </div>
  );
};

export default MovieDetailPage;
