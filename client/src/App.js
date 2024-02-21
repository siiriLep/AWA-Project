import './App.css';
import Chat from './components/Chat';
import ChatView from './components/ChatView';
import Find from './components/Find';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/Profile';
import Register from './components/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {

  
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<div><Login /></div>}> </Route>
          <Route path="/register" element={<div> <Register /></div>}> </Route>
          <Route path="/main" element={<div> <Main /></div>}> </Route>
          <Route path="/profile" element={<div> <Profile /></div>}> </Route>
          <Route path="/find" element={<div> <Find /></div>}> </Route>
          <Route path="/chat" element={<div> <Chat /></div>}> </Route>
          <Route path="/chat/:user" element={<div> <ChatView /></div>}> </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
