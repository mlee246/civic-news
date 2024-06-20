import logo from "../../assets/logo.png"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function Header() {
    return (
        <div className='header'>

            <img src={logo} alt="" className='header-logo' />

            <DropdownButton id="dropdown-basic-button" title="Select a topic">
                <Dropdown.Item href="/articles">All News</Dropdown.Item>
                <Dropdown.Item href="/articles/coding">Coding</Dropdown.Item>
                <Dropdown.Item href="/articles/football">Football</Dropdown.Item>
                <Dropdown.Item href="/articles/cooking">Cooking</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}




export default Header