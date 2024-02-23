import Button from '@mui/material/Button'; 
import '../Main.css';
import {useEffect} from 'react'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";



function Main() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const auth_token = localStorage.getItem('auth_token')
    // if there is no token, back to login page
    if (!auth_token) {
      window.location.href = "/";
    } else {
      // Authenticates the user
      fetch('api/main', {
        method: "GET",
        headers: {
          "authorization": "Bearer " + auth_token
        },
        mode: "cors"
      })
      .then(response => {
        // if tokens value is incorrect, remove the token and go back to login-page
        if (response.status === 401) {
          localStorage.removeItem("auth_token")
          window.location.href = "/";
        } else {
          response.json()
          .then((data) =>{
            let userData = data.user
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

    // When user wants to log out, remove token and redirect to login page
    const logout = () => {
        localStorage.removeItem("auth_token")
        window.location.href = "/";
    }

  // UI
  return (
    <div id="main">
        <h1>Welcome {userData.username}!</h1>
        {/* Link to chat page */}
        <a href="/chat">
        <Button variant="contained" type="button" id="btn" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Chats</Button>
        </a>
        {/* Link to find connections page */}
        <a href="/find">
        <Button variant="contained" type="button" id="btn" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Find connections</Button>
        </a>
        {/* Get to profile page */}
        <Button onClick={handleClick} variant="contained" type="button" id="btn" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}}>Profile</Button>
        {/* Button to logout */}
        <Button onClick={logout}variant="contained" type="button" id="btn" style={{background: '#ffb7a8', minWidth: '277px', color:"black"}} >Log out</Button>
        
    </div>
  )
}

export default Main