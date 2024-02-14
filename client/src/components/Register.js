import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import '../Login.css';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {useState} from 'react'

// Function to handle registering new users
function Register() {

  // DIV to show the user if registeration was succesful
  const responseDiv = document.getElementById("response")

  const [userData, setUserData] = useState({})

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
      // Display the response from server if registeration was succesful
      responseDiv.textContent = data.message
    })

  }

  // Handles change in the form
  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
}


  // Returns the register form
  return (

    <div>
        <br></br>
        <form id="register" onSubmit={submit} onChange={handleChange}>
            <h1>Sign in</h1>
            <TextField id="user" label="Username" name="username" variant="outlined" margin="normal" InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} />
            <TextField id="email" label="Email" name="email" variant="outlined" margin="normal" InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} />
            <TextField id="outlined-password-input" type='password' name="password" label="Password" variant="outlined" margin="normal"InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} />
            <br></br>
            <Button variant="contained" type="submit" id="register" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Sign in</Button>
            <div id="response"></div>
            <p>Already a user?</p>
            <a href="/">
            <Button variant="contained" type="button" id="login-redirect" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Log in</Button>
            </a>
        </form>
    </div>

  )
}

export default Register