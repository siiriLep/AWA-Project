import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {useState} from 'react'
import '../i18n';
import { useTranslation } from 'react-i18next';

// Function to handle registering new users
function Register() {

  // DIV to show the user if there are problems in registering
  const responseDiv = document.getElementById("response")

  const [userData, setUserData] = useState({})

  // Handles registeration when user submits the register form
  const submit = (e) => {
    e.preventDefault()
    // POST request to server with register form
    fetch("api/user/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(userData),
      mode: "cors"
    })
    .then(response => response.json())
    .then(data => {
      // If user creation was succesful, redirect to login page
      if (data.message === "Success") {
        window.location.href="/"
      } else { // If not, show the error message to user
        responseDiv.textContent = data.message
      }
    })

  }
  // Handles change in the form
  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
      i18n.changeLanguage(lang)
  }


  // UI
  return (
    <div>
        <br></br>
        {/* Form for signing in */}
        <form id="login-reg-form" onSubmit={submit} onChange={handleChange}>
            <h1>{t('Sign in')}</h1>
            {/* Username input */}
            <TextField id="user" label={t('Username')} name="username" variant="outlined" margin="normal" required InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} />
            {/* Email input */}          
            <TextField id="email" label={t('Email')} name="email" variant="outlined" margin="normal" required InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} />
            {/* Password input */}
            <TextField id="outlined-password-input" type='password' name="password" label={t("Password")} variant="outlined" margin="normal" required InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} />
            <br></br>
            {/* Button to send the form */}
            <Button variant="contained" type="submit" id="register" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >{t('Sign in')}</Button>
            {/* Shows Error messages to user */}
            <div id="response"></div>
            <p>{t('Already a user?')}</p>
            {/* Link to login page */}
            <a href="/">
            <Button variant="contained" type="button" id="login-redirect" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >{t('Log in')}</Button>
            </a>
        </form>
    </div>

  )
}

export default Register