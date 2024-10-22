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
  );
}

export default App;
