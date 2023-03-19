import React, { FC } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Settings } from './pages/Settings';
import { Reports } from './pages/Reports';
import { TaskList } from './pages/TaskList';
import { Timer } from './pages/Timer';

import { Header } from './components/Header';

import './App.scss';

const App: FC = () => {
	const location = useLocation();
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
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/' element={<Navigate to='/tasklist' />} />
					<Route path='/settings' element={<Settings />} />
					<Route path='/reports' element={<Reports />} />
					<Route path='/tasklist' element={<TaskList />} />
					<Route path='/timer' element={<Timer />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
