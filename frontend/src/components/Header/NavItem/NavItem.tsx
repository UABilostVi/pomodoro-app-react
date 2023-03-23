import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.scss';

type navLinkClassesProp = {
	isActive: Boolean;
};

type NavItemPropsType = {
	to: string;
	icon: string;
};

const navLinkClasses = ({ isActive }: navLinkClassesProp) =>
	isActive ? styles.active : styles.inActive;

const NavItem: FC<NavItemPropsType> = (props) => {
	return (
		<li className={styles.menuItem}>
			<NavLink to={props.to} className={navLinkClasses}>
				<span className={props.icon}></span>
			</NavLink>
		</li>
	);
};

export default NavItem;
