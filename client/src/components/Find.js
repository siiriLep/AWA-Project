import '../Main.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


function Find() {
  return (
    <div id="main">
        <a href="/main">
        <IconButton>
            <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
        </IconButton>
        </a>
        <div id="profile"style={{background: '#ffb7a8'}}>
            <h1>*Profiili*</h1>
            <p> About me: orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        </div>
        <IconButton>
            <CloseOutlinedIcon sx={{ fontSize: 60}}/>
        </IconButton>
        <IconButton>
            <FavoriteBorderOutlinedIcon sx={{ fontSize: 60, color:'#ff775c' }}/>
        </IconButton>
    </div>
  )
}

export default Find