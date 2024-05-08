import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

function AddComment({ article_id }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [commentLoading, setCommentLoading] = useState(false);

  function onSubmit({ comment }) {
    setCommentLoading(true);
    axios
      .post(
        `https://be-nc-news-zmuo.onrender.com/api/articles/${article_id}/comments`,
        { username: "tickle122", body: comment }
      )
      .then(() => {
        setCommentLoading(false);
        location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (!commentLoading) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Leave your comment here..."
          {...register("comment", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
    );
  }
  return <p>Uploading your comment...</p>;
}

export default AddComment;
