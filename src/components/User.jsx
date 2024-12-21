import Header from "./Header";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function User() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('access_token_cookie');
            if (token) {
                const response = await fetch("/user", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    alert('Error fetching user data');
                }
            } else {
                console.log('Token is undefined');
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = () => {
        Cookies.remove('access_token_cookie');
        setUserData(null);
    };

    return (
        <div>
            <Header />
            {userData ? (
                <div>
                    <h1>Welcome, {userData.username}</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>12...</p>
            )}
        </div>
    );
}