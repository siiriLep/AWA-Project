import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'

function ChatView() {

    const auth_token = localStorage.getItem('auth_token')   
    const { user } = useParams();


    const [msgData, setMsgData] = useState({})

    useEffect(() => {
        getChats();
    }, [])
    


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
        fetch("/getMessages", {
            method: "POST",
            headers: {
                "authorization": "Bearer " + auth_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: user})
        })
        .then(response => response.json())
        .then(messages => {
            renderMessages(messages)   
        })
        .catch(err => {
            console.log(err);
        });
    }

    function renderMessages(messages) {
        var messagesContainer = document.getElementById("messages-container");
        if (messages) {
            console.log(messages);
            var messageDivs = messages.map(function(message) {
                var messageDiv = document.createElement("div");
                messageDiv.id = "msgDiv"
                messageDiv.innerHTML = "<strong>"+message.sender+"</strong> " + "<br>" + message.message;

                return messageDiv;
            });
            
            messageDivs.forEach(function(messageDiv) {
                messagesContainer.appendChild(messageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight
            });
        }
    }
    
    

    
    const handleChange = (e) => {
        setMsgData(e.target.value)
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
            <div id="messages-container"></div>
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