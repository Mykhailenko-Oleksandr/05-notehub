import axios from "axios";
import type { Note } from "../types/note";

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
  headers: {
    Authorization: string;
  };
}

export async function fetchNotes(searchWord: string, page: number) {
  const url: string = "https://notehub-public.goit.study/api/notes";
  const options: OptionsAPI = {
    params: {
      search: searchWord,
      page: page,
      perPage: 12,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  };

  const res = await axios.get<ResponseAPI>(url, options);

  return res.data;
}

function createNote() {}

function deleteNote() {}
