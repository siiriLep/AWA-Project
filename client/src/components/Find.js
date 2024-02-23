import '../Main.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState, useEffect } from 'react';

const auth_token = localStorage.getItem('auth_token');


const fetchUser = () => {
    return fetch("api/random", {
        method: "GET",
        headers: {
            "authorization": "Bearer " + auth_token
        },
        mode: "cors"
    })
    .then(response => response.json())
    .catch(err => {
        console.log(err);
    });
};

function Find() {

    const [userAbout, setAboutMessage] = useState('');
    const [username, setUsername] = useState('');

    // ensures that data is fetched only when needed
    useEffect(() => {        
        fetchUser()
        .then(data => {
            // Extract username and about section and update states
            let fetchedUsername = data[0].username;
            let fetchedUserAbout = data[0].about;
            setUsername(fetchedUsername);
            setAboutMessage(fetchedUserAbout);
            console.log("here");
        })
        .catch(err => {
            console.log(err);
            const errorDiv = document.getElementById("error");
             errorDiv.textContent = 'No more users!'
        });
    }, []);

    // function to like the displayed user
    function like() {
        fetch("api/like", {
            method: "POST",
            headers: {
                "authorization": "Bearer " + auth_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // fetch a new user after liking
            fetchUser()
            .then(data => {
                let fetchedUsername = data[0].username;
                let fetchedUserAbout = data[0].about;
                setUsername(fetchedUsername);
                setAboutMessage(fetchedUserAbout);
                console.log("here");
            })
            .catch(err => {
                console.log(err);
                const errorDiv = document.getElementById("error");
                if (errorDiv) errorDiv.textContent = err.message;
            });
        });
    }

    // function to dislike the user shown
    function dislike() {
        fetch("api/dislike", {
            method: "POST",
            headers: {
                "authorization": "Bearer " + auth_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // fetch a new user after disliking
            fetchUser()
            .then(data => {
                let fetchedUsername = data[0].username;
                let fetchedUserAbout = data[0].about;
                setUsername(fetchedUsername);
                setAboutMessage(fetchedUserAbout);
                console.log("here");
            })
            .catch(err => {
                console.log(err);
                const errorDiv = document.getElementById("error");
                if (errorDiv) errorDiv.textContent = err.message;
            });
        });
    }

    // UI
    return (
        <div id="main">
            {/* Back to main page */}
            <a href="/main">
                <IconButton>
                    <KeyboardBackspaceIcon id="backBtn" />
                </IconButton>
            </a>
            {/* DIV to display username and about-section */}
            <div id="profile" style={{background: '#ffb7a8'}}>
                <h1> {username} </h1>
                <p> {userAbout} </p>
                <div id="error"></div>
            </div>
            <div id="icons" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Dislike button */}
                <IconButton onClick={dislike}>
                    <CloseOutlinedIcon id="iconBtn" sx={{ fontSize: 40}}/>
                </IconButton>
                {/* Like button */}
                <IconButton onClick={like}>
                    <FavoriteBorderOutlinedIcon id="iconBtn" sx={{ fontSize: 40, color:'#ff775c' }}/>
                </IconButton>
            </div>
        </div>
    );
}

export default Find;
