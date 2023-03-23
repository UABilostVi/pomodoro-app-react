import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: FC = () => {
	const token = localStorage.getItem('token');
	if (token) {
		return <Outlet />;
	}
	return <Navigate to='/login' />;
};

export default PrivateRoute;
