import React from 'react';

import styles from './Input.module.scss';

const Input = (props: any) => {
	return (
		<label className={styles.customInput} htmlFor={props.id}>
			{props.labelText}
			<input
				defaultValue={props.defaultValue}
				value={props.value}
				name={props.name}
				onChange={props.onChange}
				onBlur={props.onBlur}
				style={props.style}
				type={props.type}
				id={props.id}
				placeholder={props.placeholder}
				required={props.required}
				min={props.min}
				minLength={props.minLength}
				maxLength={props.maxLength}
				ref={props.refer}
			/>
		</label>
	);
};

export default Input;
