import React, { createContext, FC, useContext, useReducer } from 'react';
import { v4 } from 'uuid';
import styles from './Notification.module.scss';
import Notification from './Notification';

type NotificationType = 'info' | 'error' | 'success' | 'warning';

type ProviderProps = {
	children: React.ReactNode;
};

interface NotifPropsType {
	type: NotificationType;
	message: string;
}

interface PayloadType extends NotifPropsType {
	id: string;
}

export interface NotificationProps extends PayloadType {
	dispatch: React.Dispatch<AppActions>;
}

type AddType = { type: 'ADD_NOTIFICATION'; payload: PayloadType };
type DelType = { type: 'REMOVE_NOTIFICATION'; id: string };
type AppActions = AddType | DelType;

const NotificationContext = createContext<React.Dispatch<AppActions> | null>(
	null
);

const NotificationProvider: FC<ProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(
		(state: PayloadType[], action: AppActions) => {
			switch (action.type) {
				case 'ADD_NOTIFICATION':
					return [...state, { ...action.payload }];
				case 'REMOVE_NOTIFICATION':
					return state.filter((el) => el.id !== action.id);
				default:
					return state;
			}
		},
		[]
	);

	return (
		<NotificationContext.Provider value={dispatch}>
			<div className={styles.notificationWrapper}>
				{state.map((note) => {
					return <Notification dispatch={dispatch} key={note.id} {...note} />;
				})}
			</div>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	const dispatch = useContext(NotificationContext);

	return (props: NotifPropsType) => {
		if (dispatch) {
			dispatch({
				type: 'ADD_NOTIFICATION',
				payload: {
					id: v4(),
					...props,
				},
			});
		}
	};
};

export default NotificationProvider;
