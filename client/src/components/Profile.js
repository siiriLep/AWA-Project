import '../Main.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';  
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../i18n'
import { useTranslation } from 'react-i18next'

function Profile() {

  // User information is  got from main.js by using location /state. This is one way to do it, realised later that i could have used JWT
  // and do so in other components.
  const location = useLocation()

  // States for the about message
  const [userAbout, setUserAbout] = useState('')
  const [aboutMessage, setAboutMessage] = useState('')

  // Fetach users about message and check authentication initially
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
    fetchUserInfo()
  }, [location.state.username])

  // Fetch users about section
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
        // update about message with the about found from db
        setAboutMessage(data.message)
      } 
    })
  }

  const handleChange = (e) => {
    setUserAbout(e.target.value)
  }


  // User submits a new about section
  const submit = (e) => {
    e.preventDefault()

    const reqBody = {
      username: location.state.username,
      about: userAbout
    }
    // update the users about section
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
        // update the about for the user with the submitted about section
        setAboutMessage(data.message)
      } 
    })
  }

  // Translation
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
      i18n.changeLanguage(lang)
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
      <p>{t('About me')}</p>
      {/* Show users about section */}
      <div > {aboutMessage} </div>
      {/* Form to edit about section */}
      <p>{t('Edit your about section!')}</p>
      <form onSubmit={submit}>
        <TextField id="outlined-basic" label={t('About me')} name="about" variant="outlined" multiline rows={4} value={userAbout} onChange={handleChange} />
        <Button id="btn" variant="contained" type="submit" style={{ background: '#ffb7a8', minWidth: '277px', color:"black" }}>{t('Save')}</Button>
      </form>
    </div> 
  )
}

export default Profile