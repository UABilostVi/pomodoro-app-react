import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import NotificationProvider from './components/Notification/NotificationProvider';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<NotificationProvider>
				<App />
			</NotificationProvider>
		</BrowserRouter>
	</Provider>
);
