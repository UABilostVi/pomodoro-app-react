import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './Input.module.scss';

type InputProps = {
	legendText: string;
	error?: FieldError;
	children: any;
};

const Input: FC<InputProps> = ({ legendText, error, children }) => {
	return (
		<fieldset className={styles.fieldset}>
			<legend className={styles.legend}>{legendText}</legend>
			{children}
			{error && (
				<div className={styles.err}>{error?.message || 'Error occured'}</div>
			)}
		</fieldset>
	);
};

export default Input;
