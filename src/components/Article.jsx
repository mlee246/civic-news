import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import Votes from "./Votes";
import Error from "./Error";
import Loading from "./Loading";

function Article() {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    axios
      .get(`https://be-nc-news-zmuo.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [article_id]);

  if (error) {
    return <Error message={error} />;
  }

  if (loading) return <Loading/>;

  const timeStamp =
    article.created_at.slice(0, 10) + " " + article.created_at.slice(11, 16);

  return (
    <div className="view-article">
      
      <section className="view-article-top">
        <p className="view-article-topic">/ {article.topic}</p>
        <p className="view-article-author">{article.author}</p>
        <p className="view-article-time">{timeStamp}</p>
        <div id="view-article-votes">

          <Votes id="view-article-votes" articleVotes={article.votes} article_id={article.article_id} />
        </div>
      </section>

      <img
        className="view-article-image"
        src={article.article_img_url}
        alt={article.title}
      />

      <section className="view-article-bottom">
        <h3 className="view-article-title">{article.title}</h3>
      </section>

      <p className="view-article-body">{article.body}</p>

      <p className="view-article-comment-count">
        This article has {article.comment_count} comments;
      </p>
      <AddComment article_id={article_id} />
      <CommentCard article_id={article_id} />
    </div>
  );
}

export default Article;
