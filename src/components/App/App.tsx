import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";
const notify = () => toast.error("No movies found for your request");

export default function App() {
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [movieSelected, setMovieSelected] = useState<Movie | null>(null);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movie", topic, page],
    queryFn: () => fetchMovies(topic, page),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.results.length === 0) {
      notify();
    }
  }, [data]);

  const totalPages = data?.total_pages ?? 0;

  const openModal = (movie: Movie) => {
    setMovieSelected(movie);
  };

  const closeModal = () => {
    setMovieSelected(null);
  };

  async function handleSearch(searchWord: string) {
    setTopic(searchWord);
    setPage(1);
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        data &&
        data.results.length > 0 && (
          <MovieGrid onSelect={openModal} movies={data.results} />
        )
      )}

      {movieSelected && (
        <MovieModal movie={movieSelected} onClose={closeModal} />
      )}
      <Toaster />
    </>
  );
}
