import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './Input.module.scss';

type InputProps = {
	labelText: string;
	error?: FieldError;
	children: React.ReactNode;
	labelFor?: string;
};

const Input: FC<InputProps> = ({ labelText, error, children, labelFor }) => {
	return (
		<div className={styles.inputWrapper}>
			<label htmlFor={labelFor} className={styles.label}>
				{labelText}
			</label>
			{children}
			{error && (
				<div className={styles.err}>{error?.message || 'Error occured'}</div>
			)}
		</div>
	);
};

export default Input;
