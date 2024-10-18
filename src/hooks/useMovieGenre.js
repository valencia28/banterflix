import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieGenre = () => {
  return api.get(`genre/movie/list`);
};

//장르는 잘 바뀌지 않는 부분이어서 staleTime 지정
export const useMovieGenreQuery = () => {
  return useQuery({
    queryKey: ["movie-genre"],
    queryFn: fetchMovieGenre,
    select: (result) => result.data.genres,
    staleTime: 300000, //5분
  });
};
