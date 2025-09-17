import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { FormData } from "../../types/note";
import toast from "react-hot-toast";

interface NoteFormProps {
  onClose: () => void;
  topic: string;
  page: number;
}

const defaultValues: FormData = {
  title: "",
  content: "",
  tag: "Todo",
};

const OrderSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

export default function NoteForm({ onClose, topic, page }: NoteFormProps) {
  const queryClient = useQueryClient();

  const createNoteMutate = useMutation({
    mutationFn: (data: FormData) => createNote(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes", topic, page] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function handleSubmit(
    values: FormData,
    formikHelpers: FormikHelpers<FormData>
  ) {
    createNoteMutate.mutate(values);
    formikHelpers.resetForm();
    onClose();
  }

  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={handleSubmit}
      validationSchema={OrderSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
