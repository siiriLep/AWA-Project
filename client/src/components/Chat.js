import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';

function Chat() {


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
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    fetchMatches()


  return (
    <div id="main">Chat
        {/* Back to main page */}
        <a href="/main">
            <IconButton>
                <KeyboardBackspaceIcon id="backBtn" />
            </IconButton>
        </a>
    </div>
  )
}

export default Chat