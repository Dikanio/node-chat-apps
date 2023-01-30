// client/src/pages/chat/index.js
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';
import RoomAndUsersColumn from './room-and-users'; // Add this
import SendMessage from './send-message';
import MessagesReceived from './messages';
import axios from '../../utils/axios'

const ChatCustomer = ({ user, setUser, socket }) => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const { customerName } = useParams(); 

  useEffect(() => {
    axios.get('/users').then(response => {
      let find = response.data.find((value) => value.name === customerName)
			setUser(find);
		})
  }, [])
  return (
    <div className={styles.chatContainer}>
      {/* Add this */}
      <RoomAndUsersColumn socket={socket} user={user} setUser={setUser} setSelectedTicket={setSelectedTicket}/>

      <div>
        <MessagesReceived socket={socket} selectedTicket={selectedTicket}/>
        <SendMessage socket={socket} user={user} selectedTicket={selectedTicket}/>
      </div>
    </div>
  );
};

export default ChatCustomer;