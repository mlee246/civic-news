import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Article from "./components/Article";
import Articles from "./components/Articles";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />

        <Route
          path="/articles/coding"
          element={<Articles topic="coding" />}
        />

        <Route
          path="/articles/football"
          element={<Articles topic="football" />}
        />

        <Route
          path="/articles/cooking"
          element={<Articles topic="cooking" />}
        />
      </Routes>
    </>
  );
}

export default App;
