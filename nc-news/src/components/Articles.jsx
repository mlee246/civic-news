import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import ArticleNavBar from "./ArticleNavBar";
import Error from "./Error";

function Articles({ topic }) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("descending");
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null); 

    const request = topic
    ? `https://be-nc-news-zmuo.onrender.com/api/articles?topic=${topic}`
    : `https://be-nc-news-zmuo.onrender.com/api/articles`;

    axios
      .get(request)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [topic]);

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      if (sortBy === "votes" || sortBy === "comment_count") {
        return order === "ascending" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
      } else if (sortBy === "created_at") {
        return order === "ascending"
          ? new Date(a[sortBy]) - new Date(b[sortBy])
          : new Date(b[sortBy]) - new Date(a[sortBy]);
      }
      return 0;
    });
  }, [articles, sortBy, order]);

  if (loading) return <p>Loading...</p>;

  function changeSortBy(event) {
    setSortBy(event.target.value);
  }

  function changeOrder(event) {
    setOrder(event.target.value);
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <ArticleNavBar />
      {{
        cooking: <p>👩🏻‍🍳</p>,
        coding: <p>💻</p>,
        football: <p>⚽️</p>,
        undefined: <></>,
      }[topic]}
      <nav>
        <select name="sort-by" id="sort-by" onChange={changeSortBy}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
        <select name="order-by" id="order-by" onChange={changeOrder}>
          <option value="ascending">ᐃ</option>
          <option value="descending">ᐁ</option>
        </select>
      </nav>
      {sortedArticles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
}

export default Articles;
