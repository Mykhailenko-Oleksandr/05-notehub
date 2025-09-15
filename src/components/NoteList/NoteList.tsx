import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NotesListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NotesListProps) {
  function deleteNote(id: string) {
    console.log(id);
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
                onClick={() => deleteNote(note.id)}
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
