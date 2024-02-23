import '../Main.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';  
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Profile() {

  // User information is  got from main.js by using location /state. This is .. well one way to do it, realised later that i propably should have used JWT
  const location = useLocation()

  const [userAbout, setUserAbout] = useState('')
  const [aboutMessage, setAboutMessage] = useState('')

  useEffect(() => {
    fetchUserInfo()
  }, [location.state.username])

  const fetchUserInfo = () => {
    fetch("api/user/info", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ username: location.state.username }),
      mode: "cors"
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        setAboutMessage(data.message)
      } 
    })
  }

  const handleChange = (e) => {
    setUserAbout(e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()

    const reqBody = {
      username: location.state.username,
      about: userAbout
    }

    fetch("api/user/about", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(reqBody),
      mode: "cors"
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        setAboutMessage(data.message)
      } 
    })
  }
  
  // UI
  return (
    <div id="main">
      {/* Link to main page */}
      <a href="/main">
        <IconButton>
          <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
        </IconButton>
      </a>
      {/* Shows the users name */}
      <h2>{location.state.username}</h2>
      <p>About me</p>
      {/* Show users about section */}
      <div id="about-div"> {aboutMessage} </div>
      {/* Form to edit about section */}
      <p>Edit your about section!</p>
      <form id="about-form" onSubmit={submit}>
        <TextField id="outlined-basic" label="About me" name="about" variant="outlined" multiline rows={4} value={userAbout} onChange={handleChange} />
        <Button id="btn" variant="contained" type="submit" style={{ background: '#ffb7a8', minWidth: '277px', color:"black" }}>Save</Button>
      </form>
    </div> 
  )
}

export default Profile