import React, { FC, useEffect } from 'react';
import {
	Routes,
	Route,
	Navigate,
	useLocation,
	useNavigate,
} from 'react-router-dom';

import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Settings } from './pages/Settings';
import { Reports } from './pages/Reports';
import { TaskList } from './pages/TaskList';
import { Timer } from './pages/Timer';

import { Header } from './components/Header';

import { getCurrentUser } from './store/auth/async';
import { useAppDispatch } from './store/hooks';

import './App.scss';
import { PrivateRoute } from './components/PrivateRoute';

const App: FC = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			dispatch(getCurrentUser());
		}
	}, []);

	const headerRender =
		location.pathname === '/login' ? (
			false
		) : location.pathname === '/registration' ? (
			false
		) : (
			<Header />
		);

	return (
		<div className='container'>
			{headerRender}
			<main>
				<Routes>
					<Route path='/' element={<Navigate to='/tasklist' />} />
					<Route
						path='/login'
						element={token ? <Navigate to='/' /> : <Login />}
					/>
					<Route
						path='/registration'
						element={token ? <Navigate to='/' /> : <Registration />}
					/>
					<Route element={<PrivateRoute />}>
						<Route path='/settings' element={<Settings />} />
						<Route path='/reports' element={<Reports />} />
						<Route path='/tasklist' element={<TaskList />} />
						<Route path='/timer' element={<Timer />} />
					</Route>
					<Route path='*' element={<h1>Page not found</h1>} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
