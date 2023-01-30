// client/src/pages/chat/room-and-users.js

import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';

const RoomAndUsers = ({ user, setUser, socket, setSelectedTicket }) => {
  const [tickets, setTickets] = useState([]);

  const navigate = useNavigate();
  const { customerName } = useParams(); 

  useEffect(() => {
    axios.get('/users').then(response => {
      let find = response.data.find((value) => value.name == customerName)
			setUser(find);
      axios.get('/tickets').then(response => {
        let {data} = response
        let filtered = data.filter((value) => value.customer_id == find.id);
        setTickets(filtered);
      })
		})
    
    socket.on('list_ticket', (data) => {
      let myTicket = data.filter((value) => value.customer_id == user.id);
      setTickets(myTicket);
    });

    return () => socket.off('list_ticket');
  }, []);

  return (
    
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{user.name}</h2>
      
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
              <button onClick={() => setSelectedTicket(data) }>{data.id}</button>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default RoomAndUsers;