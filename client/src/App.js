import { useEffect, useState } from 'react';
import io from 'socket.io-client'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';
import ChatCustomer from './pages/chat-customer';

const socket = io.connect('http://localhost:3001')

function App() {
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');

  // useEffect(() => {
  //   let check = window.localStorage.getItem('user');
  //   console.log('check');
  //   console.log(check);
  //   if (check) {
  //     setUser(JSON.parse(check));
  //   } else {
  //     if (user) {
  //       console.log(user);
  //       window.localStorage.setItem('user', JSON.stringify(user));
  //     }
  //   }
  // }, [user]);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home user={user} setUser={setUser} socket={socket} />}></Route>
          <Route path='/chat/:agentName' element={<Chat user={user} setUser={setUser} socket={socket}/>}></Route>
          <Route path='/chat-customer/:customerName' element={<ChatCustomer user={user} setUser={setUser} socket={socket}/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
