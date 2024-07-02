import { useState } from "react";
import axios from "axios";
import upvote from "../../assets/upvote.png"
import downvote from "../../assets/downvote.png"

function Votes({ articleVotes, article_id }) {
  const [votes, setVotes] = useState(articleVotes);
  const [disabled, setDisabled] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [err, setErr] = useState(null);

  const handleVote = (vote) => {
    if (hasVoted) return;

    const newVotes = votes + vote;
    setVotes(newVotes);
    setDisabled(true);

    axios
      .patch(`https://be-nc-news-zmuo.onrender.com/api/articles/${article_id}`, {
        inc_votes: vote,
      })
      .then(() => {
        setDisabled(false);
        setHasVoted(true);
      })
      .catch(() => {
        setVotes(votes);
        setErr("Your vote wasn't able to be posted, please reload and try again");
        setDisabled(false);
      });
  };

  return (
    <section className="article-votes">
      {err && <p className="vote-button-error">{err}</p>}

      <button
        className="article-votes"
        onClick={() => handleVote(-1)}
        disabled={disabled || hasVoted}
        >
       <img src={downvote} alt="" className="vote-button-img"/>
      </button>
        <p>{votes}</p>
      <button
        className="article-votes"
        onClick={() => handleVote(1)}
        disabled={disabled || hasVoted}
      >
        <img src={upvote} alt="" className="vote-button-img"/>
      </button>
    </section>
  );
}

export default Votes;
