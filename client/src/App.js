import { useState } from 'react';
import io from 'socket.io-client'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';

const socket = io.connect('wss://dev-chat-api.lifepack.id', {
  // transports: ['polling'],
  secure: true,
})

// server-side
socket.on("connection", (socket) => {
  console.log('connection')
  console.log(socket); // x8WIv7-mJelg7on_ALbx
});

// client-side
socket.on("connect", () => {
  console.log('connect')
  console.log(socket); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log('disconnect')
  console.log(socket); // undefined
});

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home username={username} setUsername={setUsername} room={room} setRoom={setRoom} socket={socket} />}></Route>
          <Route path='/chat' element={<Chat username={username} room={room} socket={socket}/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
