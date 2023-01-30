// client/src/pages/chat/messages.js

import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';

const Messages = ({ user, socket, selectedTicket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    axios.get('/chats/messages').then(response => {
      let {data} = response
      let mapped = data.map((value) => {
        let map = {
          name: value.sender.name,
          ticket_id: value.ticket_id,
          message: value.message.body
        }
        return map;
      })
      setMessagesReceived(mapped)
    })
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          name: data.sender.name,
          ticket_id: data.ticket_id,
          message: data.message.body
        },
      ]);
    });

	// Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn}>
      <h1 style={{color: 'white'}}>{selectedTicket.id} - {selectedTicket?.participant_ids?.includes(user.id) ? 'SAYA' : ''}</h1>
      {selectedTicket && messagesRecieved.map((msg, i) => {
        return selectedTicket.id == msg.ticket_id ? (
          <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.name}</span>            
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
        ) : <></>
      }
      )}
      
    </div>
  );
};

export default Messages;