import React, { useState, useEffect, FC } from 'react';
import styles from './Notification.module.scss';
import { NotificationProps } from './NotificationProvider';

const Notification: FC<NotificationProps> = ({
	message,
	type,
	dispatch,
	id,
}) => {
	const [exit, setExit] = useState<boolean>(false);
	const [width, setWidth] = useState<number>(0);
	const [intervalID, setIntervalID] = useState<NodeJS.Timer>();

	useEffect(() => {
		if (width === 100) {
			handleCloseNotification();
		}
	}, [width]);

	useEffect(() => {
		handleStartTimer();
	}, []);

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
			dispatch({
				type: 'REMOVE_NOTIFICATION',
				id: id,
			});
		}, 200);
	};

	return (
		<div
			onMouseEnter={handlePauseTimer}
			onMouseLeave={handleStartTimer}
			className={`${styles.notificationItem} ${styles[type]} ${
				exit ? 'exit' : ''
			}`}
		>
			<div className={`${styles.icon} icon-tomato-${type}`}></div>
			<div className={styles.message}>{message}</div>
			<button
				className={`${styles.closeButton} icon-close`}
				onClick={handleCloseNotification}
			></button>
			<div className={styles.bar} style={{ width: `${width}%` }} />
		</div>
	);
};

export default Notification;
