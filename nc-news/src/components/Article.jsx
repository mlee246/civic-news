import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";

function Article() {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    axios
      .get(`https://be-nc-news-zmuo.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  const timeStamp =
    article.created_at.slice(0, 10) + " " + article.created_at.slice(11, 16);

  return (
    <div className="view-article">
      <section className="view-article-top">
        <p className="view-article-topic">{article.topic}</p>
        <p className="view-article-author">{article.author}</p>
        <p className="view-article-time">{timeStamp}</p>
        <p className="view-article-vote">Vote</p>
        <button className="view-article-vote-button">ᐁ</button>
        <p>{article.votes}</p>
        <button className="view-article-vote-button">ᐃ</button>
      </section>

      <img
        className="view-article-image"
        src={article.article_img_url}
        alt=""
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
