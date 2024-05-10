import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import ArticleNavBar from "./ArticleNavBar";

function Articles({ topic }) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  let request = "";

  if (topic === undefined) {
    request = `https://be-nc-news-zmuo.onrender.com/api/articles`;
  } else {
    request = `https://be-nc-news-zmuo.onrender.com/api/articles?topic=${topic}`;
  }

  useEffect(() => {
    axios
      .get(`${request}`)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [topic]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ArticleNavBar />
      {{
          cooking: <p>👩🏻‍🍳</p>,
          coding: <p>💻</p>,
          football: <p>⚽️</p>,
          undefined: <></>,
        }[topic]}
      {articles.map((article) => {
        return <ArticleCard article={article} />;
      })}
    </div>
  );
}

export default Articles;
