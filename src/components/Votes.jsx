import { useState } from "react";
import axios from "axios";

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
        className="view-article-vote-button"
        onClick={() => handleVote(-1)}
        disabled={disabled || hasVoted}
        >
        ⬇️
      </button>
        <p>{votes}</p>
      <button
        className="view-article-vote-button"
        onClick={() => handleVote(1)}
        disabled={disabled || hasVoted}
      >
        ⬆
      </button>
    </section>
  );
}

export default Votes;
