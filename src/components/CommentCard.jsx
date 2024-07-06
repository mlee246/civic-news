import { useState, useEffect } from "react";
import axios from "axios";
import upvote from "../../assets/upvote.png"
import downvote from "../../assets/downvote.png"

function CommentCard({ article_id }) {
  const username = "tickle122";
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [votedComments, setVotedComments] = useState({});

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
  }, [article_id]);

  if (loading) return <p>Loading...</p>;

  function timeStamp(comment) {
    return (
      comment.created_at.slice(0, 10) + " " + comment.created_at.slice(11, 16)
    );
  }

  function handleCommentDelete(comment_id) {
    setDeleteLoading(true);
    axios
      .delete(`https://be-nc-news-zmuo.onrender.com/api/comments/${comment_id}`)
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  }

  function handleVote(comment_id, vote) {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.comment_id === comment_id
          ? { ...comment, votes: comment.votes + vote }
          : comment
      )
    );

    setVotedComments((prevVotedComments) => ({
      ...prevVotedComments,
      [comment_id]: true,
    }));

  }

  return (
    <div className="comment-section">
      {comments.map((comment) => {
        const hasVoted = votedComments[comment.comment_id] || false;

        return (
          <div key={comment.comment_id} className="comment-card">
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
                    onClick={() => handleCommentDelete(comment.comment_id)}
                  >
                    {deleteLoading ? "Loading..." : "Delete Comment"}
                  </button>
                ) : (
                  <>
                    <button
                      className="comment-vote-button"
                      onClick={() => handleVote(comment.comment_id, -1)}
                      disabled={hasVoted}
                    >
                      <img src={downvote} alt="" id="vote-button-img" />
                    </button>
                    <button
                      className="comment-vote-button"
                      onClick={() => handleVote(comment.comment_id, 1)}
                      disabled={hasVoted}
                    >
                      <img src={upvote} alt="" id="vote-button-img" />
                    </button>
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
