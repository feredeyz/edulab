import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import Cookies from "js-cookie";

export default function Header() {
    const user = Cookies.get('user_data');
    const navigate = useNavigate();

    const logout = () => {
        fetch('/api/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: Cookies.get('access_token_cookie')
            })
        }).then(
            (response) => {
                if (response.ok) {
                    Cookies.remove('access_token_cookie');
                    Cookies.remove('user_data');
                    navigate('/');
                }
        }
        )
    }
    return (
        <header>
            <div>
                <Link to="/"><img src="" alt="logo" /></Link>
                <input id="search-field" placeholder="Search" type="text" />
                <ul>
                    <li>
                        <Link to="/courses">Courses</Link>
                    </li>
                    <li>
                        {user ? (<Link to="/user">Profile</Link>) : (<Link to="/registration">Profile</Link>)}
                    </li>
                    <li id="auth">
                        {user ? (<button id="logout-button" onClick={logout}>Logout</button>) : (<><Link to="/registration">Sign up</Link><Link to="/login">Log in</Link></>)}
                    </li>
                </ul>
            </div>
        </header>
    );
}
