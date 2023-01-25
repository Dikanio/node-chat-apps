import { useState } from 'react';
import io from 'socket.io-client'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';
import ChatCustomer from './pages/chat-customer';

const socket = io.connect('http://localhost:3100')

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home username={username} setUsername={setUsername} room={room} setRoom={setRoom} socket={socket} />}></Route>
          <Route path='/chat/:agentName' element={<Chat socket={socket}/>}></Route>
          <Route path='/chat-customer/:customerName' element={<ChatCustomer socket={socket}/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
