// client/src/pages/chat/index.js
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';
import RoomAndUsersColumn from './room-and-users'; // Add this
import SendMessage from './send-message';
import MessagesReceived from './messages';

const Chat = ({ socket }) => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const { agentName } = useParams();

  useEffect(() => {
    socket.on('created_ticket', (data) => {
      socket.emit('join_room', {ticket: data.ticket})
    });
  }, [socket])
  return (
    <div className={styles.chatContainer}>
      {/* Add this */}
      <RoomAndUsersColumn socket={socket} agentName={agentName} setSelectedTicket={setSelectedTicket}/>

      <div>
        <MessagesReceived socket={socket} selectedTicket={selectedTicket}/>
        <SendMessage socket={socket} agentName={agentName} selectedTicket={selectedTicket}/>
      </div>
    </div>
  );
};

export default Chat;