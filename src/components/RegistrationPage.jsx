import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const navigate = useNavigate();
    
    const registration = async (e) => {
        e.preventDefault();
        const response = await fetch("/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, verifyPassword })
        })
        const d = await (response.json());
        if (response.ok) {
            if (d.access_token_cookie) {
                navigate("/user");
            } else {
                alert("Invalid registration");
            }
        } else if (d.error === "Username already exists") {
            alert("Username already exists");
        } else if (d.error === "Passwords do not match") {
            alert("Passwords do not match");
        }
    }
    return (
        <div>
            <Header />
            <form onSubmit={registration}>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" name="verifyPassword" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}/>
                <input type="submit" value="Sign up" />
            </form>
        </div>
    )
}