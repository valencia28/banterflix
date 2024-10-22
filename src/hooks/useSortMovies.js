import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSortMovies = ({ sortBy, page }) => {
  return api.get(`discover/movie?sort_by=${sortBy}&page=${page}`);
};

export const useSortMoviesQuery = ({ sortBy }) => {
  return useInfiniteQuery({
    queryKey: ["movie-sort", { sortBy }],
    queryFn: ({ pageParam = 1 }) =>
      fetchSortMovies({ page: pageParam, sortBy }),
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
