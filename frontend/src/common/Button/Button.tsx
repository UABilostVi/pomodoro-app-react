import React, { FC, MouseEventHandler } from 'react';

import styles from './Button.module.scss';

type ButtonType = 'save' | 'ok' | 'cancel';

interface IButtonProps {
	type: ButtonType;
	onClickHandler?: MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	disabled?: boolean;
}

const Button: FC<IButtonProps> = ({
	type,
	disabled,
	onClickHandler,
	children,
}) => {
	let classes = styles.button;
	classes +=
		type === 'save'
			? ` ${styles.save}`
			: type === 'ok'
			? ` ${styles.ok}`
			: type === 'cancel'
			? ` ${styles.cancel}`
			: '';
	return (
		<button className={classes} onClick={onClickHandler} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
