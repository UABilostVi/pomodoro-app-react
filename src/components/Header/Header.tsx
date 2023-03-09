import React, { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';
import { ReactComponent as SettingsIcon } from '../../assets/settingsIcon.svg';
import { ReactComponent as ReportsIcon } from '../../assets/reportsIcon.svg';
import { ReactComponent as TasksIcon } from '../../assets/tasksIcon.svg';

type navLinkClassesProp = {
	isActive: Boolean;
};

const Header: FC = () => {
	const location = useLocation();
	const [title, setTitle] = useState('');
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

	const navLinkClasses = ({ isActive }: navLinkClassesProp) =>
		isActive ? styles.active : styles.inActive;

	return (
		<header className={styles.header}>
			<h1 className={styles.pageName}>{title}</h1>
			<nav>
				<ul className={styles.menu}>
					<li>
						<NavLink to='tasklist' className={navLinkClasses}>
							<TasksIcon />
						</NavLink>
					</li>
					<li>
						<NavLink to='reports' className={navLinkClasses}>
							<ReportsIcon />
						</NavLink>
					</li>
					<li>
						<NavLink to='settings' className={navLinkClasses}>
							<SettingsIcon />
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
