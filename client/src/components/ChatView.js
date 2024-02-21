import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';

function ChatView() {
    const auth_token = localStorage.getItem('auth_token')   
    const { user } = useParams();
    console.log(user)


  return (
    <div id="main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{user}</h2>
            <a href="/chat">
            <IconButton>
                <KeyboardBackspaceIcon id="backBtn" />
            </IconButton>
            </a>      
        </div>
        <div style={{background: '#ffb7a8', height:"350px"}}>
            <br></br>
            <div style={{background: '#fddbbf', height:"50px", width: "100px", margin: "20px"}}></div>
            <br></br>
            <div style={{background: '#fddbbf', height:"50px", width: "100px", margin: "20px"}}></div>
        </div>
        <form id="msg-form">
            <TextField id="outlined-basic" variant="outlined" multiline rows={4} />
            <IconButton type="submit">
                    <SendIcon/>
            </IconButton>
        </form>
    </div>
  )
}

export default ChatView