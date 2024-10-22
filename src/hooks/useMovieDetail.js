import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = (movieId) => {
  return api
    .get(`movie/${movieId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching movie detail:", error);
      throw error;
    });
};

export const useMovieDetailQuery = ({ movieId }) => {
  return useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: () => fetchMovieDetail(movieId),
    select: (result) => result.data,
  });
};
