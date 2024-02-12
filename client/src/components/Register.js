import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import '../Login.css';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


function Register() {
  return (

    <div>
        <br></br>
        <form id="register">
            <h1>Sign in</h1>
            <TextField id="user" label="Username" variant="outlined" margin="normal" InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} />
            <TextField id="email" label="Email" variant="outlined" margin="normal" InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} />
            <TextField id="outlined-password-input" type='password' label="Password" variant="outlined" margin="normal"InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} />
            <br></br>
            <Button variant="contained" type="submit" id="register" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Sign in</Button>
            <p>Already a user?</p>
            <Button variant="contained" type="button" id="login-redirect" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Log in</Button>
        </form>
    </div>

  )
}

export default Register