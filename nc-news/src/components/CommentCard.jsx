import { useState, useEffect } from "react";
import axios from "axios";

function CommentCard({ article_id }) {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://be-nc-news-zmuo.onrender.com/api/articles/${article_id}/comments`
      )
      .then((response) => {
        setComments(response.data.comments);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  function timeStamp(comment) {
    return (
      comment.created_at.slice(0, 10) + " " + comment.created_at.slice(11, 16)
    );
  }
  return (
    <>
      {comments.map((comment) => {
        return (
          <div className="comment-card">
            {comment.body}
            <section className="comment-details">
              <p className="comment-author">{comment.author}</p>
              <p>{timeStamp(comment)}</p>

              <p className="comment-vote">Vote</p>
              <button className="comment-vote-button">ᐁ</button>
              <button className="comment-vote-button">ᐃ</button>
            </section>
          </div>
        );
      })}
    </>
  );
}

export default CommentCard;
