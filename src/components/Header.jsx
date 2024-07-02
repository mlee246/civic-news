import {Link} from "react-router-dom"
import logo from "../../assets/logo-trial-4.png"
import favicon from "../../assets/favicon.png"
import home from "../../assets/home.png"

function Header() {
    return (
        <div className='header'>
            <Link to={"/"}>
            
                <img src={home} alt="" className="icon-images"/>
            </Link>
            <button>
            </button>
            <img src={logo} alt="" className='header-logo' />
            <img src={favicon} alt="" className="icon-images"/>
      
        </div>
    )
}




export default Header