import Button from '@mui/material/Button'; 
import '../Main.css';
import {useEffect} from 'react'

function Main() {

  useEffect(() => {
    const auth_token = localStorage.getItem('auth_token')

    if (!auth_token) {
      console.log("no token :((")
      window.location.href = "/";
    } else {
      fetch('api/main', {
        method: "GET",
        headers: {
          "authorization": "Bearer " + auth_token
        },
        mode: "cors"
      })
      .then(response => {
        console.log(response);
        if (response.status === 401) {
          console.log("auth token incorrect!!")
          localStorage.removeItem("auth_token")
          window.location.href = "/";
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }, []);

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