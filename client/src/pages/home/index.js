import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { useEffect, useState } from 'react';

export default function Home(props) {
	const {user, setUser, socket} = props;
	const [users, setUsers] = useState([]);
	const [userId, setUserId] = useState("");
	const navigate = useNavigate();
	
	const createTicket = () => {
		if (userId !== '') {
			let selectUser = users.find((value) => value.id == userId );
			setUser(selectUser);
			if (selectUser.role == 'customer') {
				socket.emit('create_ticket', { customer_id: selectUser.id });
			
				navigate(`/chat-customer/${selectUser.name}`, { replace: true });
			} else {
				navigate(`/chat/${selectUser.name}`, { replace: true });
			}
		}
	}

	useEffect(() => {
		axios.get('/users').then(response => {
			setUsers(response.data)
		})
	}, [])

	return (
		<div className={styles.container} >
			<div className={styles.formContainer}>
				<h1>{`<>Ticket</>`}</h1>
				<select onChange={(e) => setUserId(e.target.value)} className={styles.input}>
					<option>--- Select User ---</option>
					{users.map((data, key) => (
						<option value={data.id} key={key}>{data.name}</option>
					))}
				</select>

				<button onClick={createTicket} className="btn btn-secondary" style={{ width: '100%' }}>Masuk</button>
			</div>
		</div>
	)
}