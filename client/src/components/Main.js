import Button from '@mui/material/Button'; 
import '../Main.css';


function Main() {

    const logout = () => {
        localStorage.removeItem("auth_token")
        window.location.href = "/";
    }


  return (
    <div id="main">
        <h1>Welcome!</h1>

        <a href="/chat">
        <Button variant="contained" type="button" id="btn" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Chats</Button>
        </a>

        <a href="/find">
        <Button variant="contained" type="button" id="btn" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Find connections</Button>
        </a>

        <Button onClick={logout}variant="contained" type="button" id="btn" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Log out</Button>
        
    </div>
  )
}

export default Main