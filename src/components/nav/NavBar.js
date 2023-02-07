import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()


    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Parks</Link>
            </li>
            {
                localStorage.getItem("parklife_user")  ?
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/user-parks">My Parks</Link>
                    </li>
                    :
                    ""
            }

            {
                localStorage.getItem("parklife_user")  ?
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/park-form">Add New Park</Link>
                    </li>
                    :
                    ""
            }





            {
                localStorage.getItem("parklife_user")  ?
                    <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("parklife_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : 
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/login">Login</Link>
                    </li>
            }
        </ul>
    )
}

