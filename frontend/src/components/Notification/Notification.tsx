// import React, { FC, useState } from 'react';

import styles from './Notification.module.scss';

// type NotificationProps = {
// 	message: string;
// 	type: NotificationType;
// };

// const Notification: FC<NotificationProps> = ({ message, type }) => {
// 	const [close, setClose] = useState(false);
// 	function onClose() {
// 		setClose(true);
// 	}

// 	return (
// 		<div
// 			className={`${styles.notification} ${styles[type]} ${
// 				close ? styles.notDisplay : ''
// 			}`}
// 		>
// 			<div className={`${styles.icon} icon-tomato-${type}`}></div>
// 			<div className={styles.message}>{message}</div>
// 			<button
// 				className={`${styles.closeButton} icon-close`}
// 				onClick={onClose}
// 			></button>
// 		</div>
// 	);
// };

// export default Notification;

import React, { useState } from 'react';

type NotificationType = 'info' | 'error' | 'success' | 'warning';

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

	// const handleCloseNotification = () => {
	// 	handlePauseTimer();
	// 	setExit(true);
	// 	setTimeout(() => {
	// 		props.dispatch({
	// 			type: 'REMOVE_NOTIFICATION',
	// 			id: props.id,
	// 		});
	// 	}, 400);
	// };

	// React.useEffect(() => {
	// 	if (width === 100) {
	// 		// Close notification
	// 		handleCloseNotification();
	// 	}
	// }, [width]);

	React.useEffect(() => {
		handleStartTimer();
	}, []);

	return (
		// <div
		// 	onMouseEnter={handlePauseTimer}
		// 	onMouseLeave={handleStartTimer}
		// 	className={`notification-item ${
		// 		props.type === 'SUCCESS' ? 'success' : 'error'
		// 	} ${exit ? 'exit' : ''}`}
		// >
		// 	<p>{props.message}</p>
		// 	<div className={'bar'} style={{ width: `${width}%` }} />
		// </div>
		<div
			onMouseEnter={handlePauseTimer}
			onMouseLeave={handleStartTimer}
			className={`${styles.notificationItem} ${styles.notification} ${
				styles[props.type]
			} ${exit ? 'exit' : ''}`}
		>
			<div className={`${styles.icon} icon-tomato-${props.type}`}></div>
			<div className={styles.message}>{props.message}</div>
			<button
				className={`${styles.closeButton} icon-close`}
				// onClick={handleCloseNotification}
			></button>
			<div className='bar' style={{ width: `${width}%` }} />
		</div>
	);
};

export default Notification;
