import { Link } from 'react-router-dom'


function ArticleNavBar (){
   return ( <nav className="article-nav-bar">
    <Link to="/articles" className="header-nav-link" > 
    All</Link>
    <Link to="/articles/coding" className="header-nav-link" > 
    Coding</Link>
    <Link to="/articles/football" className="header-nav-link">Football</Link>
    <Link to="/articles/cooking" className="header-nav-link" >Cooking</Link>
</nav>)
}

export default ArticleNavBar