import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const fetchMovieVideo = (movieId) => {
  return api.get(`movie/${movieId}/videos`);
};

export const useMovieVideoQuery = ({ movieId }) => {
  return useQuery({
    queryKey: ["movie-video", movieId],
    queryFn: () => fetchMovieVideo(movieId),
    select: (result) => result.data.results,
  });
};
