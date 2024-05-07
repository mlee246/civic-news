import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Homepage from './components/Homepage'
import AllArticles from './components/AllArticles'
import Article from './components/Article'

function App() {

  return (
    <>
    <Header />

    <Routes>
      <Route path ="/" element={<Homepage />} />
      <Route path ="/articles" element={<AllArticles />} />
      <Route path ="/articles/:article-id" element={<Article />} />
    </Routes>

    </>
  )
}

export default App
