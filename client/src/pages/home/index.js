import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export default function Home(props) {
	const {username, setUsername, room, setRoom, socket} = props;
	const navigate = useNavigate();
	
	const joinRoom = () => {
		if (room !== '' && username !== '') {
			socket.emit('join_room', { username, room });
			navigate('/chat', { replace: true });
		}
	}

	return (
		<div className={styles.container} >
			<div className={styles.formContainer}>
				<h1>{`<>DevRooms</>`}</h1>
				<input onChange={(e) => setUsername(e.target.value)} className={styles.input} placeholder="Username..."></input>

				<select onChange={(e) => setRoom(e.target.value)} className={styles.input}>
					<option>--- Select Room ---</option>
					<option value="javascript">Javascript</option>
					<option value="node">Node</option>
					<option value="express">Express</option>
					<option value="react">React</option>
				</select>

				<button onClick={joinRoom} className="btn btn-secondary" style={{ width: '100%' }}>Join Room</button>
			</div>
		</div>
	)
}