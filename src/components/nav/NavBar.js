import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Parks</Link>
            </li>            
            <li className="navbar__item active">
                <Link className="navbar__link" to="/UserPage">My Parks</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Login</Link>
            </li>               
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("parklife_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
                </li>
                
            
        </ul>
    )
}

