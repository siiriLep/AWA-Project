import { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

function Chat() {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetchMatches()
    }, [])

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
            setMatches(data.matches)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function renderMatches() {
        return matches.map((match) => (
            <div>
                <a href={"chat/" + match}>
                <Button id={match} variant="contained" type="button"  style={{background: '#ffb7a8', minWidth: '277px', color:"black", margin:"5px"}}>{match}</Button>
                </a>
            </div>
        ));
    }
    

    return (
        <div id="main">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Chats</h2>
                <a href="/main">
                <IconButton>
                    <KeyboardBackspaceIcon id="backBtn" />
                </IconButton>
                </a>
            </div>
            <div className="chats">
                {renderMatches()}
            </div>
        </div>
    )
}

export default Chat; 