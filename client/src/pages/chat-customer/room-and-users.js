// client/src/pages/chat/room-and-users.js

import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomAndUsers = ({ customerName, socket, setSelectedTicket }) => {
  const [tickets, setTickets] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('list_ticket', (data) => {
      let myTicket = data.filter((value) => value.username == customerName);
      setTickets(myTicket);
    });

    return () => socket.off('list_ticket');
  }, [socket]);

  return (
    
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{customerName}</h2>
      
      {/* <button className='btn btn-outline' onClick={takeTicket}>
        Dapatkan Chat
      </button> */}
      <div>
        <ul className={styles.usersList}>
          {tickets.map((data) => (
            <li
              style={{
                fontWeight: 'normal',
              }}
              key={data.id}
            >
              <button onClick={() => setSelectedTicket(data) }>{data.username} - {data.ticket}</button>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default RoomAndUsers;