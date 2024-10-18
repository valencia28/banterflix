import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSimilarMovies = (movieId) => {
  return api.get(`movie/${movieId}/similar`);
};

export const useSimilarMoviesQuery = ({ movieId }) => {
  return useQuery({
    queryKey: ["similar-movies", movieId],
    queryFn: () => fetchSimilarMovies(movieId),
    select: (result) => result.data.results,
  });
};
