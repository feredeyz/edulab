import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import '../styles/Registration.css'

export default function RegistrationPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const registration = async (event) => {
        event.preventDefault();
        setError(null);
        const response = await fetch("/api/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, verifyPassword })
        });
        const d = await response.json();
        if (response.ok) {
            if (d.access_token_cookie) {
                Cookies.set("access_token_cookie", d.access_token_cookie, { expires: 7, sameSite: 'None', secure: true });
                navigate("/user");
            } else {
                setError("Invalid registration");
            }
        } else {
            switch (d.error) {
                case "Missing required fields":
                    setError("Missing required fields");
                    break;

                case "Passwords do not match":
                    setError("Passwords do not match");
                    break;

                case "Username already exists":
                    setError("Username already exists");
                    break;
                
                default:
                    setError("Invalid registration");
                    break;
            }
        }
    }

    return (
        <div>
            <Header />
            <div id="page-reg-content">
                <p>Signing Up</p>
                <form onSubmit={registration}>
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
                    <input
                        type="password"
                        name="verifyPassword"
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        placeholder="Verify Password"
                        required
                    />
                    <input type="submit" value="Sign up" />
                </form>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
}