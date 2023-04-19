import React, { FC } from 'react';

import styles from './Input.module.scss';

type InputProps = {
	legendText: string;
	children: React.ReactNode;
	error?: string;
	isDirty?: boolean;
};

const Input: FC<InputProps> = ({ legendText, error, children, isDirty }) => {
	return (
		<fieldset className={styles.fieldset}>
			<legend className={styles.legend}>{legendText}</legend>
			{children}
			{error && isDirty && (
				<div className={styles.err}>{error || 'Error occured'}</div>
			)}
		</fieldset>
	);
};

export default Input;
