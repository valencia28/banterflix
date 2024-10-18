import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchNowPlayingMovies = () => {
  return api.get(`movie/now_playing`);
};

export const useNowPlayingMoviesQuery = () => {
  return useQuery({
    queryKey: ["now-playing-movie"],
    queryFn: fetchNowPlayingMovies,
    //최근 개봉 영화부터 가져오기
    select: (result) => {
      return result.data.results.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    },
  });
};
