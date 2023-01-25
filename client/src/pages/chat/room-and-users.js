// client/src/pages/chat/room-and-users.js

import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomAndUsers = ({ agentName, socket, setSelectedTicket}) => {
  const [openTickets, setOpenTickets] = useState([]);
  const [inProgressTickets, setInProgressTickets] = useState([]);
  const [doneTickets, setDoneTicket] = useState([]);
  const [tab, setTab] = useState('open');

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('list_ticket', (data) => {
      let open = data.filter((value) => value.status == 'open');
      let inProgress = data.filter((value) => value.status == 'inprogress');
      let done = data.filter((value) => value.status == 'done');
      setOpenTickets(open);
      setInProgressTickets(inProgress);
      setDoneTicket(done);
    });

    return () => socket.off('list_ticket');
  }, [socket]);

  const takeTicket = () => {
    if (openTickets.length > 0) {
      
      // const __createdtime__ = Date.now();
      let ticket = openTickets[0];
      // console.log(ticket);
      console.log(agentName);
      socket.emit('take_ticket', {...ticket, agentName});
    }
    
    // Redirect to home page
    // navigate('/', { replace: true });
  };

  return (
    
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{agentName}</h2>
      
      <button className='btn btn-outline' onClick={takeTicket}>
        Dapatkan Chat
      </button>
      <h6 className={styles.usersTitle}>Open</h6>
      <div>
        <ul className={styles.usersList}>
          {openTickets.map((data) => (
            <li
              style={{
                fontWeight: 'normal',
              }}
              key={data.id}
            >
              <button>{data.username} - {data.ticket}</button>
            </li>
          ))}
        </ul>
      </div>
      <h6 className={styles.usersTitle}>In Progress</h6>
      <div>
        <ul className={styles.usersList}>
          {inProgressTickets.map((data) => (
            <li
              style={{
                fontWeight: 'normal',
              }}
              key={data.id}
            >
              <button onClick={() => setSelectedTicket(data) }>{data.username} - {data.ticket}  - {data.agentName == agentName ? 'Saya' : 'Bukan Saya'}</button>
            </li>
          ))}
        </ul>
      </div>
      <h6 className={styles.usersTitle}>Done</h6>
      <div>
        <ul className={styles.usersList}>
          {doneTickets.map((data) => (
            <li
              style={{
                fontWeight: 'normal',
              }}
              key={data.id}
            >
              <button>{data.username} - {data.ticket}</button>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default RoomAndUsers;