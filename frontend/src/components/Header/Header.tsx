import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavItem } from './NavItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { unSetUser } from '../../store/auth/authSlice';
import styles from './Header.module.scss';

const Header: FC = () => {
	const location = useLocation();
	const [title, setTitle] = useState<string>('');
	const { userInfo } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		switch (location.pathname) {
			case '/settings':
				setTitle('Settings');
				break;
			case '/reports':
				setTitle('Reports');
				break;
			case '/tasklist':
				setTitle('Task list');
				break;
			default:
				break;
		}
	}, [location.pathname]);

	function onLogout() {
		dispatch(unSetUser());
		localStorage.removeItem('token');
		navigate('/login');
	}

	return (
		<header className={styles.header}>
			<h1 className={styles.pageName}>{title}</h1>
			<nav>
				<ul className={styles.menu}>
					{location.pathname === '/tasklist' && (
						<li>
							<button className={styles.delButton}>
								<span className='icon-delete'></span>
							</button>
						</li>
					)}
					<NavItem to='tasklist' icon='icon-tasklist' />
					<NavItem to='reports' icon='icon-reports' />
					<NavItem to='settings' icon='icon-settings' />
					<li className={styles.userInfo}>
						{userInfo?.username}
						<button className={styles.logoutButton} onClick={onLogout}>
							<span className='icon-logout'></span>
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
