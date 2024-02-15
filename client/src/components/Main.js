import Button from '@mui/material/Button'; 
import '../Main.css';
import {useEffect} from 'react'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";



function Main() {
  //const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const auth_token = localStorage.getItem('auth_token')

    // if there is no token, back to login page
    if (!auth_token) {
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
        // if tokens value is incorrect, remove the token and go back to login
        if (response.status === 401) {
          localStorage.removeItem("auth_token")
          window.location.href = "/";
        } else {
          response.json()
          .then((data) =>{
            /*let username = data.user.username
            console.log(data)
            setUsername(username)*/
            let userData = data.user
            console.log(userData)
            setUserData(userData)
          })

        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }, []);

    const navigate = useNavigate()
    function handleClick() {
      navigate('/profile', { state: userData })
    }

    // When user wants to log out, remove token and redirect to login pagew
    const logout = () => {
        localStorage.removeItem("auth_token")
        window.location.href = "/";
    }


  return (
    <div id="main">
        <h1>Welcome !</h1>

        <a href="/chat">
        <Button variant="contained" type="button" id="btn" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Chats</Button>
        </a>

        <a href="/find">
        <Button variant="contained" type="button" id="btn" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Find connections</Button>
        </a>

        <Button onClick={handleClick} variant="contained" type="button" id="btn" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}}>Profile</Button>

        <Button onClick={logout}variant="contained" type="button" id="btn" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Log out</Button>
        
    </div>
  )
}

export default Main