import { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

function Chat() {
    // List of matches
    const [matches, setMatches] = useState([])

    // User authentication and Fetch matches initially
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
        fetchMatches()
    }, [])

    // Function that fetches the matches
    function fetchMatches() {
        const auth_token = localStorage.getItem('auth_token')
        fetch("api/matches", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + auth_token
            },
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            // Update with the matches
            setMatches(data.matches)
        })
        .catch(err => {
            console.log(err)
        })
    }
    // Function that renders matches
    function renderMatches() {
        return matches.map((match) => (
            <div key={match}>
                {/* When match is pressed, redirect to a chat with the match */}
                <a href={"chat/" + match}>
                <Button id={match} variant="contained" type="button"  style={{background: '#ffb7a8', minWidth: '277px', color:"black", margin:"5px", padding:"20px"}}>{match}</Button>
                </a>
            </div>
        ))
    }
    

    return (
        <div id="main">
            {/* "Header" */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Chats</h2>
            {/* Button back to main page */}
                <a href="/main">
                <IconButton>
                    <KeyboardBackspaceIcon />
                </IconButton>
                </a>
            </div>
            {/* Rendered list of matches */}
            <div id="chats">
                {renderMatches()}
            </div>
        </div>
    )
}

export default Chat;