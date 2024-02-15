import './App.css';
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
        <Routes>
          <Route path="/" element={<div> <Header /> <Login /></div>}> </Route>
          <Route path="/register" element={<div> <Header /> <Register /></div>}> </Route>
          <Route path="/main" element={<div> <Header /> <Main /></div>}> </Route>
          <Route path="/profile" element={<div> <Header /> <Profile /></div>}> </Route>
          <Route path="/find" element={<div> <Header /> <Find /></div>}> </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
