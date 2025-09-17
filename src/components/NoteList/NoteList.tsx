import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";
import toast from "react-hot-toast";

interface NotesListProps {
  notes: Note[];
  topic: string;
  page: number;
}

export default function NoteList({ notes, topic, page }: NotesListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutate = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes", topic, page] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function handleDeleteNote(id: string) {
    deleteNoteMutate.mutate(id);
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        return (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
