import Header from "./Header";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import '../styles/User.css';
import * as image from '../images/edit.png';

export default function User() {
    const [userData, setUserData] = useState(null);
    const [shouldUpdateAvatar, setShouldUpdateAvatar] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('access_token_cookie');
            
            if (token) {
                const response = await fetch(`/api/user`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    Cookies.set('user_data', JSON.stringify(data), { expires: 7, sameSite: 'None', secure: true });
                    setShouldUpdateAvatar(true);
                } else {
                    alert('Error fetching user data');
                }
            } else {
                console.log('Token is undefined');
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const getAvatar = async () => {
            if (userData && userData.id && shouldUpdateAvatar) {
                try {
                    const response = await fetch('/api/get_avatar', {
                        method: "POST",
                        body: JSON.stringify({
                            id: userData.id
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.ok) {
                        const blob = await response.blob();
                        const url = URL.createObjectURL(blob);
                        setUserData((prevData) => ({
                            ...prevData,
                            avatar: url
                        }));
                        setShouldUpdateAvatar(false); 
                    } else {
                        console.log('Error fetching avatar');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getAvatar();
    }, [userData, shouldUpdateAvatar]);

    const changeAvatar = async () => {
        const el = document.getElementById('avatarChangeButton');
        const formData = new FormData();
        formData.append('image', el.files[0]);
        formData.append('id', userData.id);
        await fetch('/api/change_avatar', {
            method: "POST",
            body: formData,
        }).then(() => {
            setShouldUpdateAvatar(true);
        });
    };

    const clickOnInput = () => {
        document.querySelector('#avatarChangeButton').click();
    };

    return (
        <div>
            <Header />
            <div id="page-content">
            {userData ? (
                <div id="user-info">
                    <div id="user-info-avatar">
                        <img id="user-info-avatar-img" alt="avatar" src={userData.avatar} />
                        <button onClick={clickOnInput}><img src={image.default} alt="Change" /></button>
                        <input type="file" accept="image/png, image/jpeg" name="image" id="avatarChangeButton" onInput={changeAvatar} style={{ display: 'none' }} />
                    </div>
                    <h1>{userData.username}</h1>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            </div>
        </div>
    );
}