// client/src/pages/chat/room-and-users.js

import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios'

const RoomAndUsers = ({ user, setUser, socket, setSelectedTicket}) => {
  const [openTickets, setOpenTickets] = useState([]);
  const [inProgressTickets, setInProgressTickets] = useState([]);
  const [doneTickets, setDoneTicket] = useState([]);

  const navigate = useNavigate();
  const { agentName } = useParams();

  useEffect(() => {
    axios.get('/users').then(response => {
      let find = response.data.find((value) => value.name == agentName)
			setUser(find);
      axios.get('/tickets').then(response => {
        let {data} = response
        let open = data.filter((value) => value.status == 'open');
        let inProgress = data.filter((value) => value.status == 'in_progress');
        let done = data.filter((value) => value.status == 'done');
        setOpenTickets(open);
        setInProgressTickets(inProgress);
        setDoneTicket(done);
      })
		})

    socket.on('list_ticket', (data) => {
      let open = data.filter((value) => value.status == 'open');
      let inProgress = data.filter((value) => value.status == 'in_progress');
      let done = data.filter((value) => value.status == 'done');
      setOpenTickets(open);
      setInProgressTickets(inProgress);
      setDoneTicket(done);
    });

    return () => socket.off('list_ticket');
  }, [socket]);

  const takeTicket = () => {
    if (openTickets.length > 0) {
      let ticket = openTickets[0];
      socket.emit('take_ticket', {ticket_id: ticket.id, agent_id: user.id});
    }
    
    // Redirect to home page
    // navigate('/', { replace: true });
  };

  return (
    
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{user.name}</h2>
      
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
              <button>{data.id}</button>
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
              <button onClick={() => setSelectedTicket(data) }>{data.id}</button>
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
              <button>{data.id}</button>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default RoomAndUsers;