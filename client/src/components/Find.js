import '../Main.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState, useEffect } from 'react';

// I had lots of problems with fetching only 1 user, which i fixed by moving fetchUser out of Find
// which made the code a bit messy

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

    // Check authentication and fetch a random user form the db initially
    useEffect(() => {    
        // USER AUTHENTICATION
        const auth_token = localStorage.getItem('auth_token')
        // if there is no token, back to login page
        if (!auth_token) {
          window.location.href = "/";
        } else {
          // Authenticates the user
          fetch('api/main', {
            method: "GET",
            headers: {
              "authorization": "Bearer " + auth_token
            },
            mode: "cors"
          })
          .then(response => {
            // if tokens value is incorrect, remove the token and go back to login-page
            if (response.status === 401) {
              localStorage.removeItem("auth_token")
              window.location.href = "/";
            } 
          })
          .catch(error => {
            console.log(error);
          })
        } 
        // Fetch a random user from the db   
        fetchUser()
        // Show the users information
        .then(updateUserData)
        .catch(err => {
            console.log(err)
            let errorDiv = document.getElementById("error");
            errorDiv.textContent = 'Error occured: You might have run out of users'
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
            // fetch a new user after liking
            fetchUser()
            .then(data => {
                console.log(data);
                fetchUser()
                .then(updateUserData)
                .catch(err => {
                    console.log(err);
                    let errorDiv = document.getElementById("error");
                    errorDiv.textContent = 'Error occured: You might have run out of users'
                });
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
            // fetch a new user after liking
            fetchUser()
            .then(data => {
                console.log(data);
                fetchUser()
                .then(updateUserData)
                .catch(err => {
                    console.log(err);
                    let errorDiv = document.getElementById("error");
                    errorDiv.textContent = 'Error occured: You might have run out of users'
                });
            });
        });
    }
    // Updates user data
    function updateUserData(data) {
        let fetchedUsername = data[0].username;
        let fetchedUserAbout = data[0].about;
        setUsername(fetchedUsername);
        setAboutMessage(fetchedUserAbout);
    }

    // UI
    return (
        <div id="main">
            {/* Back to main page */}
            <a href="/main">
                <IconButton>
                    <KeyboardBackspaceIcon/>
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
