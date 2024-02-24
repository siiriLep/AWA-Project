import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import '../Login.css';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import {useState} from 'react'
import '../i18n';
import { useTranslation } from 'react-i18next';


function Login() {

  // DIV to show the user if there are problems in logging in
  const responseDiv = document.getElementById("response")

  const [userData, setUserData] = useState({})

  const submit = (e) => {
    e.preventDefault()
    // POST request to server with login form
    fetch("api/user/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userData),
        mode: "cors"
    })
    .then(response => response.json())
    .then(data => {
      // if creating token was succesful, store it and redirect user to main page
      console.log(data)
      if(data.token) {
        storeToken(data.token)
        window.location.href="/main"
      } else {
        // if there were problems, show error message to user
        responseDiv.textContent = data.message
      }
    })
    .catch(err => {
      console.log(err)
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
            {/* Form for submitting login information */}
        <form id="login-reg-form" onSubmit={submit} onChange={handleChange}>
            <h1>{t('Log in')}</h1>
            {/* Email */}
            <TextField id="email" label={t('Email')} name="email" variant="outlined" margin="normal" required InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} />
            {/* Password */}
            <TextField id="outlined-password-input" type='password' name="password" label={t("Password")} variant="outlined" margin="normal" required InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} />
            <br></br>
            {/* Button for logging in*/}
            <Button variant="contained" type="submit" id="login" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >{t('Log in')}</Button>
            {/* Shows user an error message*/}
            <div id="response"></div>
            <p>{t('New to Tinteri?')}</p>
            {/* Link to register page */}
            <a href="/register">
            <Button variant="contained" type="button" id="signup" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >{t('Sign up')}</Button>
            </a>
        </form>
    </div>

  )
}

// Stores the token
function storeToken(token) {
  console.log(token)
  localStorage.setItem("auth_token", token);
}

export default Login