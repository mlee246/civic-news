import { useState } from "react";
import axios from "axios";

function Votes({ articleVotes, article_id }) {
  const [votes, setVotes] = useState(articleVotes);
  const [disabled, setDisabled] = useState(false);
  const [err, setErr] = useState(null);

  function handleVote(vote) {
    setVotes((articleVotes += vote));
    setDisabled(true);
    axios
      .patch(
        `https://be-nc-news-zmuo.onrender.com/api/articles/${article_id}`,
        { inc_votes: vote }
      )
      .then(() => {
        setVotes(articleVotes);
        setDisabled(false);
      })
      .catch(() => {
        setVotes((articleVotes -= vote));
        setErr(
          "Your vote wasn't able to be posted, please reload and try again"
        );
      });
  }

  return (
        <section className="article-votes">
        {err ? (<p className="vote-button-error">{err}</p>):(

          <section className="article-votes">

            <p className="article-vote">Vote</p>
            <button
              className="view-article-vote-button"
              onClick={() => handleVote(-1)}
              disabled={disabled}
            >ᐁ</button>

            <p>{votes}</p>

            <button
              className="view-article-vote-button"
              onClick={() => handleVote(1)}
              disabled={disabled}
            >ᐃ</button>

           </section>
          )}
          </section>
  );
}

export default Votes;
