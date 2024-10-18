import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AppLayout from "./layout/AppLayout";
import SearchPage from "./pages/SearchPage/SearchPage";
import Footer from "./layout/components/Footer/Footer";

//홈페이지    /
//영화 전체 보여주는 페이지 + 검색기능    /movies?q=내용
//영화 디테일 페이지        /movies/:id

//추후 영화 관련 페이지들이 더 생길 경우 /movies/:id/recommendation   /movies/:id/reviews
//이럴 경우를 위해 nested route 구성을 보통 사용함

// index 쓰면 부모의 path와 동일하다는 의미
//nested route로 구성하면 현재 코드처럼 구성 가능
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="movies">
          <Route index element={<MoviePage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>
        <Route path="search" element={<SearchPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>

    // <Routes>
    //   <Route path="/" element={<AppLayout />}>
    //     <Route index element={<Homepage />} />
    //     <Route path="/movies" element={<MoviePage />} />
    //     <Route path="/movies/:id" element={<MovieDetailPage />} />
    //   </Route>
    // </Routes>
  );
}

export default App;
