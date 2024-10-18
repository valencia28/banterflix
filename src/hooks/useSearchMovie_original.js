// import { useQuery } from "@tanstack/react-query";
// import api from "../utils/api";

// //검색 키워드에 따라 달라지기 때문에 keyword 추가
// const fetchSearchMovie = ({ keyword, page }) => {
//   return keyword
//     ? api.get(`search/movie?query=${keyword}&page=${page}`)
//     : api.get(`/movie/popular?page=${page}`);
// };

// export const useSearchMovieQuery = ({ keyword, page }) => {
//   return useQuery({
//     queryKey: ["movie-search", { keyword, page }],
//     queryFn: () => fetchSearchMovie({ keyword, page }),
//     select: (result) => result.data,
//     keepPreviousData: true, //페이지 변경 시 이전 데이터 보존
//   });
// };

// import { useInfiniteQuery } from "@tanstack/react-query";
// import api from "../utils/api";

// const fetchSearchMovie = ({ keyword, page }) => {
//   return keyword
//     ? api.get(`search/movie?query=${keyword}&page=${page}`)
//     : api.get(`/movie/popular?page=${page}`);
// };

// export const useSearchMovieQuery = ({ keyword }) => {
//   return useInfiniteQuery({
//     queryKey: ["movie-search", { keyword }],
//     queryFn: ({ pageParam = 1 }) =>
//       fetchSearchMovie({ keyword, page: pageParam }),
//     getNextPageParam: (lastPage, allPages) => {
//       const nextPage = allPages.length + 1;
//       return lastPage.data.total_pages >= nextPage ? nextPage : undefined;
//     },
//     select: (data) => ({
//       pages: data.pages.flatMap((page) => page.data.results),
//       total_pages: data.pages[0]?.data.total_pages,
//     }),
//     keepPreviousData: true,
//   });
// };

import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sortBy }) => {
  if (keyword) {
    return api.get(`search/movie?query=${keyword}&page=${page}`);
  } else {
    // 키워드가 없으면 정렬 옵션을 포함한 discover/movie 엔드포인트 사용
    return api.get(`discover/movie?sort_by=${sortBy}&page=${page}`);
  }
};

export const useSearchMovieQuery = ({ keyword, sortBy }) => {
  return useInfiniteQuery({
    queryKey: ["movie-search", { keyword, sortBy }],
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchMovie({ keyword, page: pageParam, sortBy }),
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
