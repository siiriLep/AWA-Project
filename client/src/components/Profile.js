import '../Main.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';  
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import {useLocation} from 'react-router-dom';

function Profile() {

    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
    const location = useLocation();
    console.log(location.state.username)
    console.log(location.state.email)


  return (
    <div id="main">
        <a href="/main">
        <IconButton>
            <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
        </IconButton>
        </a>
        <h2>{location.state.username}</h2>
        <p>About me</p>
        <p id="about">{location.state.about}</p>
 
        <p>Edit your about section!</p>
        <TextField id="outlined-basic" label="About me" variant="outlined" />
        <Button id="btn"variant="contained" type="submit" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Save</Button>

    </div> 
  )
}

export default Profile