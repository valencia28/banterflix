import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page }) => {
  return keyword
    ? api.get(`search/movie?query=${keyword}&page=${page}`)
    : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword }) => {
  return useInfiniteQuery({
    queryKey: ["movie-search", keyword],
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchMovie({ keyword, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.data.total_pages >= nextPage ? nextPage : undefined;
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.data.results),
      total_pages: data.pages[0]?.data.total_pages,
    }),
    keepPreviousData: true,
  });
};
