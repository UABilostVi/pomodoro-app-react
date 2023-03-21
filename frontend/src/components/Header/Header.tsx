import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavItem } from './NavItem';
import classNames from 'classnames';

import styles from './Header.module.scss';
import { useAppSelector } from '../../store/hooks';

const Header: FC = () => {
	const location = useLocation();
	const [title, setTitle] = useState('');
	const { userInfo } = useAppSelector((state) => state.auth);

	useEffect(() => {
		switch (location.pathname) {
			case '/settings':
				setTitle('Settings');
				break;
			case '/reports':
				setTitle('Reports');
				break;
			case '/tasklist':
				setTitle('Daily task');
				break;
			default:
				break;
		}
	}, [location.pathname]);

	return (
		<header className={styles.header}>
			<h1 className={styles.pageName}>{title}</h1>
			<nav>
				<ul className={styles.menu}>
					<NavItem to='tasklist' icon='icon-tasklist' />
					<NavItem to='reports' icon='icon-reports' />
					<NavItem to='settings' icon='icon-settings' />
					<li className={styles.userInfo}>
						{userInfo?.username}
						<button className={styles.logoutButton}>
							<span className='icon-logout'></span>
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
