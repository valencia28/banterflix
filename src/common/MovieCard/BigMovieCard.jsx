import "./BigMovieCard.style.css";
import React from "react";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  //장르 아이디와 이름 매핑하는 함수
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  //영화 상세페이지 핸들러
  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="big-movie-card"
      onClick={handleCardClick}
    >
      <div className="big-movie-over-lay">
        <h2>{movie?.title}</h2>
        <div className="big-movie-release-date-age-info">
          <div>{movie?.release_date?.substring(0, 4)}</div>
          <div>
            {movie?.adult ? (
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
        <div className="big-movie-rating">
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
          <div>{movie?.vote_average?.toFixed(1)}</div>
        </div>

        <div className="big-movie-overview">{movie.overview}</div>
        {showGenre(movie.genre_ids).map((id) => (
          <Badge bg="danger" className="big-movie-genre">
            {id}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
