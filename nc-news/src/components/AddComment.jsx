import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Error from "./Error";

function AddComment({ article_id }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState(null);

  function onSubmit({ comment }) {
    setCommentLoading(true);
    setError(null);
    axios
      .post(
        `https://be-nc-news-zmuo.onrender.com/api/articles/${article_id}/comments`,
        { username: "tickle122", body: comment }
      )
      .then(() => {
        setCommentLoading(false);
        reset(); 
        location.reload(true);
      })
      .catch((error) => {
        setCommentLoading(false);
        setError(error.message);
      });
  }

  if (error) {
    return <Error message={error} />;
  }

  if (commentLoading) {
    return <p>Uploading your comment...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Leave your comment here..."
        {...register("comment", { required: "This field is required" })}
      />
      {errors.comment && <span>{errors.comment.message}</span>}
      <input type="submit" />
    </form>
  );
}

export default AddComment;
