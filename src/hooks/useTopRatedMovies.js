import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

//api내 엔드포인트 이름은 api 문서에 있음
const fetchTopRatedMovies = () => {
  return api.get(`/movie/top_rated`);
};

export const useTopRatedMovieQuery = () => {
  return useQuery({
    queryKey: ["movie-top-rated"],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};
