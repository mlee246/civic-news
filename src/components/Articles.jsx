import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import Error from "./Error";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
    setSortBy(event);
  }

  function changeOrder(event) {
    setOrder(event);
  }

  if (error) {
    return <Error message={error} />;
  }

  const topicBarClass = topic ? `topic-bar ${topic}` : 'topic-bar';

  return (
    <div>
      <div id="topic-bar" className={topicBarClass}>
      <DropdownButton id="dropdown-basic-button" title="Select a topic">
                <Dropdown.Item href="/articles">All News</Dropdown.Item>
                <Dropdown.Item href="/articles/coding">Coding</Dropdown.Item>
                <Dropdown.Item href="/articles/football">Football</Dropdown.Item>
                <Dropdown.Item href="/articles/cooking">Cooking</Dropdown.Item>
            </DropdownButton>
            
          <DropdownButton id="sort-by-dropdown" title="Sort-by" onSelect={changeSortBy}>
            <Dropdown.Item eventKey="created_at" >Date</Dropdown.Item>
            <Dropdown.Item eventKey="votes" >Votes</Dropdown.Item>
            <Dropdown.Item eventKey="comment_count" >Comments</Dropdown.Item>
          </DropdownButton>

          <DropdownButton id="order-by-dropdown" title="Order" onSelect={changeOrder}>
            <Dropdown.Item eventKey="descending">Descending</Dropdown.Item>
            <Dropdown.Item eventKey="ascending">Ascending</Dropdown.Item>
          </DropdownButton>
       
       
      </div>
      {sortedArticles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
}

export default Articles;
