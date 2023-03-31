import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './Input.module.scss';

type RegisterDataProps = [string, object];

type InputProps = {
	type: string;
	labelText?: string;
	placeholder: string;
	error?: FieldError;
	register: Function;
	registerData: RegisterDataProps;
};

const Input: FC<InputProps> = ({
	type,
	labelText,
	placeholder,
	error,
	register,
	registerData,
}) => {
	return (
		<label className={styles.customInput}>
			{labelText}
			<input
				type={type}
				placeholder={placeholder}
				{...register(...registerData)}
			/>
			{error && (
				<div className={styles.err}>{error?.message || 'Error occured'}</div>
			)}
		</label>
	);
};

export default Input;
