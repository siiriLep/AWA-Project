import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import {useState} from 'react'

function ChatView() {
    const auth_token = localStorage.getItem('auth_token')   
    const { user } = useParams();
    console.log(user)
    const [msgData, setMsgData] = useState({})



    function sendMessage(e) {
        let reqBody = {
            username: user,
            message: msgData
        }
        e.preventDefault() 
        fetch("/sendMessage", {
            method: "POST",
            headers: {
                "authorization": "Bearer " + auth_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function getChats() {
        //Tudutudutudu
    }
    
    const handleChange = (e) => {
        setMsgData(e.target.value)
        console.log(msgData)
      }
    



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
        <form id="msg-form" onSubmit={sendMessage} >
            <TextField id="outlined-basic" variant="outlined"  name="message" multiline rows={4} onChange={handleChange}/>
            <IconButton type="submit">
                    <SendIcon/>
            </IconButton>
        </form>
    </div>
  )
}

export default ChatView