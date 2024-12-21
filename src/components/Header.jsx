import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
    return (
        <header>
            <div>
                <p>logo</p>
                <input id="search-field" placeholder="Search" type="text" />
                <ul>
                    <li>
                        <Link to="/registration">1</Link>
                    </li>
                    <li>
                        <Link to="/login">2</Link>
                    </li>
                    <li>
                        <Link to="/">3</Link>
                    </li>
                    <li>
                        <Link to="/">4</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
