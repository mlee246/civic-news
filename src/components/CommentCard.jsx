import { useState, useEffect } from "react";
import axios from "axios";

function CommentCard({ article_id }) {
  const username = "tickle122";
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://be-nc-news-zmuo.onrender.com/api/articles/${article_id}/comments`)
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
    )}

  function handleCommentDelete(comment_id) {
    setDeleteLoading(true);
    axios
      .delete(`https://be-nc-news-zmuo.onrender.com/api/comments/${comment_id}`)
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  }

  return (
    <div className="comment-section">
      {comments.map((comment) => {
        return (
          <div className="comment-card">
            {comment.body}
            <section className="comment-details">
              <p className="comment-author">{comment.author}</p>
              <p>{timeStamp(comment)}</p>

              <p className="comment-vote">{comment.votes} Votes</p>
              <div className="vote-or-delete">
                {comment.author === username ? (
                  <button
                    className="comment-delete-button"
                    disabled={deleteLoading}
                    onClick={() => handleCommentDelete(comment.comment_id)}>
                    {deleteLoading ? "Loading..." : "Delete Comment"}
                  </button>
                ) : (
                  <>
                    <button className="comment-vote-button">ᐁ</button>
                    <button className="comment-vote-button">ᐃ</button>
                  </>
                )}
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}

export default CommentCard;