import React, { useState, useEffect } from 'react';
import styles from './Notification.module.scss';

type NotificationType = 'info' | 'error' | 'success' | 'warning';

// type NotificationProps = {
// 	message: string;
// 	type: NotificationType;
// };

const Notification = (props: any) => {
	const [exit, setExit] = useState(false);
	const [width, setWidth] = useState(0);
	const [intervalID, setIntervalID] = useState<any>(null);

	const handleStartTimer = () => {
		const id = setInterval(() => {
			setWidth((prev) => {
				if (prev < 100) {
					return prev + 0.5;
				}

				clearInterval(id);
				return prev;
			});
		}, 20);

		setIntervalID(id);
	};

	const handlePauseTimer = () => {
		clearInterval(intervalID);
	};

	const handleCloseNotification = () => {
		handlePauseTimer();
		setExit(true);
		setTimeout(() => {
			props.dispatch({
				type: 'REMOVE_NOTIFICATION',
				id: props.id,
			});
		}, 200);
	};

	useEffect(() => {
		if (width === 100) {
			// Close notification
			handleCloseNotification();
		}
	}, [width]);

	useEffect(() => {
		handleStartTimer();
	}, []);

	return (
		<div
			onMouseEnter={handlePauseTimer}
			onMouseLeave={handleStartTimer}
			className={`${styles.notificationItem} ${styles[props.type]} ${
				exit ? 'exit' : ''
			}`}
		>
			<div className={`${styles.icon} icon-tomato-${props.type}`}></div>
			<div className={styles.message}>{props.message}</div>
			<button
				className={`${styles.closeButton} icon-close`}
				onClick={handleCloseNotification}
			></button>
			<div className={styles.bar} style={{ width: `${width}%` }} />
		</div>
	);
};

export default Notification;
