import React, { useState } from "react";
import { useFormik } from "formik";
import { Post, AddPost } from "../models/Post";
import * as Yup from "yup";
import { addPost } from "../services/PostService";

const validationSchemaPost = Yup.object({
  title: Yup.string()
    .min(5, "La longueur du titre du post doit être d'au moins 5 caractères.")
    .required("Le titre du post est obligatoire."),
  body: Yup.string().required("Le contenu du post est obligatoire."),
});

const AddPostForm: React.FC<AddPost> = ({ onPostAdded }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValue: Post = {
    id: Date.now(),
    userId: 1,
    title: "",
    body: "",
  };

  const handleSubmit = (newPost: Post): void => {
    setIsLoading(true);
    addPost(newPost)
      .then((response) => {
        const { data } = response;
        formikPost.resetForm();
        onPostAdded(data);
        setIsLoading(false);
      })
      .catch();
  };

  const formikPost = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchemaPost,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <form onSubmit={formikPost.handleSubmit}>
      <div>
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={formikPost.handleChange}
          value={formikPost.values.title}
        />
        {formikPost.touched.title && formikPost.errors.title ? (
          <div style={{ color: "red" }}>{formikPost.errors.title}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="body">Contenu du post :</label>
        <textarea
          id="body"
          name="body"
          onChange={formikPost.handleChange}
          value={formikPost.values.body}
        />
        {formikPost.touched.body && formikPost.errors.body ? (
          <div style={{ color: "red" }}>{formikPost.errors.body}</div>
        ) : null}
      </div>
      <button type="submit" disabled={isLoading}>
        {" "}
        {isLoading ? "En cours..." : "Soumettre"}
      </button>
    </form>
  );
};

export default AddPostForm;
