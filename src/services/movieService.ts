import axios from "axios";
import type { Movie } from "../types/movie";

interface DataHttpResponse {
  results: Movie[];
  total_pages: number;
}

interface OptionsAPI {
  params: {
    query: string;
    page: number;
  };
  headers: {
    Authorization: string;
  };
}

export async function fetchMovies(searchWord: string, page: number) {
  const url: string = "https://api.themoviedb.org/3/search/movie";
  const options: OptionsAPI = {
    params: {
      query: searchWord,
      page: page,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  const res = await axios.get<DataHttpResponse>(url, options);

  return res.data;
}
