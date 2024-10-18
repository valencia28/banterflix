import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api";

// const fetchSortMovies = ({ sortBy, page }) => {
//   return api
//     .get(`discover/movie?sort_by=${sortBy}&page=${page}`)
//     .then((response) => {
//       console.log("resss: ", response);
//       return response;
//     });
// };

// const fetchSortMovies = ({ sortBy, page }) => {
//   if (sortBy) {
//     return api.get(`discover/movie?sort_by=${sortBy}&page=${page}`);
//   } else {
//     api.get(`/movie/popular`);
//   }
// };

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

// import { useQuery } from "@tanstack/react-query";
// import api from "../utils/api";

// const fetchSortMovies = ({ sortBy }) => {
//   return api.get(`discover/movie?sort_by=${sortBy}`);
// };

// const fetchSortMovies = ({ sortBy }) => {
//   return api.get(`discover/movie?sort_by=${sortBy}`).then((response) => {
//     console.log("are you???", response);
//     return response;
//   });
// };

// const fetchSortMovies = ({ sortBy }) => {
//   return api
//     .get(`discover/movie?sort_by=${sortBy}`)
//     .then((response) => {
//       console.log("API 응답: ", response); // 응답 내용
//       return response;
//     })
//     .catch((error) => {
//       if (error.response) {
//         // 서버가 응답을 반환한 경우
//         console.error("API 호출 오류: ", error.response.data); // 서버 응답 내용
//         console.error("API 호출 상태 코드: ", error.response.status); // 상태 코드
//         console.error("API 호출 헤더: ", error.response.headers); // 헤더 정보
//       } else if (error.request) {
//         // 요청은 보냈으나 응답을 받지 못한 경우
//         console.error(
//           "API 호출 오류: 요청이 보내졌으나 응답이 없음",
//           error.request
//         );
//       } else {
//         // 오류가 요청을 설정하는 중 발생한 경우
//         console.error("API 호출 오류: ", error.message);
//       }
//     });
// };

// export const useSortMoviesQuery = ({ sortBy }) => {
//   return useQuery({
//     queryKey: ["movie-sort", { sortBy }],
//     queryFn: () => fetchSortMovies({ sortBy }),
//     // select: (result) => result.data, // 필요하면 선택할 수 있음
//   });
// };
