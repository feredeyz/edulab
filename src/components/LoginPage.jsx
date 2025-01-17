import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import '../styles/Login.css'

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault();
        setError(null);
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        const d = await response.json();
        if (response.ok) {
            if (d.access_token_cookie) {
                Cookies.set("access_token_cookie", d.access_token_cookie);
                navigate("/user");
            }
        } else {
            switch (d.error) {
                case "Invalid username or password":
                    setError("Invalid username or password");
                    break;
                default:
                    setError("Invalid login");
                    break;
            }
        }
    }

    return (
        <div>
            <Header />
            <div id="page-login-content">
                <p>Logging in</p>
                <form onSubmit={login}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <input type="submit" value="Log in" />
                </form>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
}