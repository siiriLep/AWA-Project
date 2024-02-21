import '../Main.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState, useEffect } from 'react';


function Find() {
    const [userAbout, setAboutMessage] = useState('')
    const [username, setUsername] = useState('')
    const auth_token = localStorage.getItem('auth_token')
    
    // ensures that data is fetched only when needed
    useEffect(() => {        
        fetchUser()
    }, []) 

    // fetches random user from db and shows it to user
    function fetchUser() {
        fetch("api/random", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + auth_token
            },
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            // Extract username and about section and update states
            let username = data[0].username
            let userAbout = data[0].about
            setUsername(username)
            setAboutMessage(userAbout)
        })
        .catch(err => {
            console.log(err)
            const errorDiv = document.getElementById("error") 
            errorDiv.textContent = 'There are no new users to show'       
        })
    }

    // funciton to like the displayed user
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
            console.log(data)
            // fetch a new user after liking
            fetchUser()
        })
        

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
            console.log(data)
            // fetch a new user after disliking
            fetchUser()
        })
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
            <div id="icons">
                {/* Dislike button */}
                <IconButton onClick={dislike}>
                    <CloseOutlinedIcon id="iconBtn" sx={{ fontSize: 60}}/>
                </IconButton>
                {/* Like button */}
                <IconButton onClick={like}>
                    <FavoriteBorderOutlinedIcon id="iconBtn" sx={{ fontSize: 60, color:'#ff775c' }}/>
                </IconButton>
            </div>
        </div>
    );
}

export default Find;
