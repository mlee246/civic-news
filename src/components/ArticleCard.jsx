import { Link } from "react-router-dom";
import Votes from "./Votes";

function ArticleCard({ article }) {
  const timeStamp =
    article.created_at.slice(0, 10) + " " + article.created_at.slice(11, 16);

  return (
    <div className="article-card">
      <section className="article-card-top">
        <p className="article-card-title">{article.title}</p>
        <Votes
          className="view-article-top"
          articleVotes={article.votes}
          article_id={article.article_id}
        />
      </section>

      <img
        className="article-card-image"
        src={article.article_img_url}
        alt=""
      />

      <section className="article-card-bottom">
        <p className="article-card-topic">/ {article.topic}</p>
        <p className="article-card-time">{timeStamp}</p>
        <p className="article-card-comments">
          {article.comment_count} comments
        </p>
        <Link
          className="view-article-button"
          to={`/articles/${article.article_id}`}
        >
          Go to article...
        </Link>
      </section>
    </div>
  );
}

export default ArticleCard;
