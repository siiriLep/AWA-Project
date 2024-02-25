import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'

function ChatView() {
    const auth_token = localStorage.getItem('auth_token')  
    const [msgData, setMsgData] = useState({})
    // Get username from params
    const { user } = useParams();

    // Fetch messages initially and authenticate
    useEffect(() => {
        // USER AUTHENTICATION
        const auth_token = localStorage.getItem('auth_token')
        // if there is no token, back to login page
        if (!auth_token) {
          window.location.href = "/";
        } else {
          // Authenticates the user
          fetch('/main', {
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
        getChats()
        // Simple polling for messages
        const waitTime = setInterval(getChats, 5000)
        return () => clearInterval(waitTime)
    }, [])

    // Function to send a message
    function sendMessage(e) {
        let reqBody = {
            username: user,
            message: msgData
        }
        e.preventDefault() 
        // Sends the message
        fetch("/sendMessage", {
            method: "POST",
            headers: {
                "authorization": "Bearer " + auth_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        })
        .then(response => {
            getChats()
        })
        .catch(err => {
            console.log(err)
        })
    }

    // Get all the messages between the users
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
            // Render the messages 
            renderMessages(messages)   
        })
        .catch(err => {
            console.log(err);
        });
    }

    // Show the fetched messages between users
    function renderMessages(messages) {
        var messagesContainer = document.getElementById("messages-container")
        if (messages) {
            // For every message, create a div that has the message and the senders name in it
            var messageDivs = messages.map(function(message) {
                // Make timestamp into a date object
                let timestamp = new Date(message.timestamp)
                // returns date in local timezone
                let formattedDate = timestamp.toLocaleString()
                //Create the message
                var messageDiv = document.createElement("div")
                messageDiv.id = "msgDiv"
                messageDiv.innerHTML = "<strong>"+message.sender+"</strong> " + "<br>" + message.message +"<br>"+ formattedDate
                return messageDiv
            })
            // Add messages to messagecontainer
            messageDivs.forEach(function(messageDiv) {
                messagesContainer.appendChild(messageDiv)
                // Show the latest message
                messagesContainer.scrollTop = messagesContainer.scrollHeight
            })
        }
    }
    
    const handleChange = (e) => {
        setMsgData(e.target.value)
      }
    
  return (
    <div id="main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Show the user that youre chatting with */}
            <h2>{user}</h2>
        {/* Link to chat page */}
            <a href="/chat">
            <IconButton>
                <KeyboardBackspaceIcon/>
            </IconButton>
            </a>      
        </div>
        {/* Container for messages */}
        <div style={{background: '#ffb7a8', height:"350px"}}>
            <div id="messages-container"></div>
        </div>
        {/* Form to send messages */}
        <form id="msg-form" onSubmit={sendMessage} >
            <TextField id="outlined-basic" variant="outlined"  name="message" multiline rows={4} onChange={handleChange} />
            <IconButton type="submit">
                    <SendIcon/>
            </IconButton>
        </form>
    </div>
  )
}

export default ChatView