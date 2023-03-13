import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './pages/Login';
import { Settings } from './pages/Settings';
import { Reports } from './pages/Reports';
import { TaskList } from './pages/TaskList';
import { Timer } from './pages/Timer';

import { Header } from './components/Header';

import './App.scss';

const App: FC = () => {
	return (
		<div className='container'>
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<Navigate to='/tasklist' />} />
					<Route path='/login' element={<Login />} />
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
