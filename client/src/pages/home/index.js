import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export default function Home(props) {
	const {username, setUsername, room, setRoom, socket} = props;
	const navigate = useNavigate();

	const generateTicket = (length) => {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	
	const createTicket = () => {
		if (username !== '') {
			let ticket = `TICKET-${generateTicket(5)}`;
			socket.emit('create_ticket', { username, ticket });
			alert(`Nomor Tiket ${ticket} berhasil dibuat`);
			navigate(`/chat-customer/${username}`, { replace: true });
		}
	}

	return (
		<div className={styles.container} >
			<div className={styles.formContainer}>
				<h1>{`<>Ticket</>`}</h1>
				<input onChange={(e) => setUsername(e.target.value)} className={styles.input} placeholder="Username..."></input>

				<button onClick={createTicket} className="btn btn-secondary" style={{ width: '100%' }}>Create Ticket</button>
			</div>
		</div>
	)
}