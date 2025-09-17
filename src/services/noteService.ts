import axios from "axios";
import type { FormData, Note } from "../types/note";

interface ResponseAPI {
  notes: Note[];
  totalPages: number;
}

interface OptionsAPI {
  params: {
    search: string;
    page: number;
    perPage: number;
  };
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_NOTEHUB_TOKEN
}`;

export async function fetchNotes(searchWord: string, page: number) {
  const options: OptionsAPI = {
    params: {
      search: searchWord,
      page: page,
      perPage: 12,
    },
  };

  const res = await axios.get<ResponseAPI>("/notes", options);

  return res.data;
}

export async function createNote(data: FormData) {
  const res = await axios.post<Note>("/notes", data);

  return res.data;
}

export async function deleteNote(id: string) {
  await axios.delete<Note>(`/notes/${id}`);
}
