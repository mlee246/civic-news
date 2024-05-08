import {Link} from 'react-router-dom'

function Header(){
    return (
        <div className='header'>

        <h1 className="header-title">NC News</h1>

        <nav className="header-nav-bar">
            <Link to="/" className="header-nav-link">Home</Link>
            <Link to="/" className="header-nav-link">Create</Link>
            <Link to="/articles" className="header-nav-link">Articles</Link>
        </nav>
        
        </div>
    )
}




export default Header