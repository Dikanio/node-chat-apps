// client/src/pages/chat/index.js
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import styles from './styles.module.css';
import RoomAndUsersColumn from './room-and-users'; // Add this
import SendMessage from './send-message';
import MessagesReceived from './messages';

const ChatCustomer = ({ socket }) => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const { customerName } = useParams();
  return (
    <div className={styles.chatContainer}>
      {/* Add this */}
      <RoomAndUsersColumn socket={socket} customerName={customerName} setSelectedTicket={setSelectedTicket}/>

      <div>
        <MessagesReceived socket={socket} selectedTicket={selectedTicket}/>
        <SendMessage socket={socket} customerName={customerName} selectedTicket={selectedTicket}/>
      </div>
    </div>
  );
};

export default ChatCustomer;