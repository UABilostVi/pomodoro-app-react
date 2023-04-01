import React, { FC, MouseEventHandler } from 'react';

import styles from './Button.module.scss';

type CustomType = 'save' | 'ok' | 'cancel';
type ButtonType = 'submit' | 'reset' | 'button' | undefined;

interface IButtonProps {
	buttonType: ButtonType;
	customType: CustomType;
	onClickHandler?: MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	disabled?: boolean;
}

const Button: FC<IButtonProps> = ({
	customType,
	disabled,
	onClickHandler,
	children,
	buttonType,
}) => {
	let classes = styles.button;
	classes +=
		customType === 'save'
			? ` ${styles.save}`
			: customType === 'ok'
			? ` ${styles.ok}`
			: customType === 'cancel'
			? ` ${styles.cancel}`
			: '';
	return (
		<button
			type={buttonType}
			className={classes}
			onClick={onClickHandler}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
