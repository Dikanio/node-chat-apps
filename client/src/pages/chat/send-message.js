// client/src/pages/chat/send-message.js

import styles from './styles.module.css';
import React, { useState } from 'react';

const SendMessage = ({ socket, user, selectedTicket }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { ticket_id: selectedTicket.id, message, sender_id: user.id, sender_name: user.name, sender_role: user.role});
      setMessage('');
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className={selectedTicket?.participant_ids?.includes(user.id) ? 'btn btn-primary':'btn btn-danger'} onClick={sendMessage} disabled={!selectedTicket?.participant_ids?.includes(user.id)}>
      
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;