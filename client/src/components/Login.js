import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import '../Login.css';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import InputAdornment from '@mui/material/InputAdornment';


function Login() {
  return (

    <div>
        <br></br>
        <form id="login">
            <h1>Log in</h1>
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
            <Button variant="contained" type="submit" id="login" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Log in</Button>
            <p>New to Tinteri?</p>
            <a href="/register">
            <Button variant="contained" type="button" id="signup" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Sign up</Button>
            </a>
        </form>
    </div>

  )
}

export default Login