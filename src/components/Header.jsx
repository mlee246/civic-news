import logo from "../../assets/logo-trial-4.png"
import favicon from "../../assets/favicon.png"

function Header() {
    return (
        <div className='header'>

            <img src={logo} alt="" className='header-logo' />
            <img src={favicon} alt="" />
      
        </div>
    )
}




export default Header