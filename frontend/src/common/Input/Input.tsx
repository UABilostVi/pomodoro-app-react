import React from 'react';

import './input.css';

const Input = (props: any) => {
	return (
		<label htmlFor={props.id}>
			{props.labelText}
			<input
				defaultValue={props.defaultValue}
				value={props.value}
				name={props.name}
				onChange={props.onChange}
				style={props.style}
				type={props.type}
				id={props.id}
				placeholder={props.placeholder}
				required={props.required}
				min={props.min}
				minLength={props.minLength}
				ref={props.refer}
			/>
		</label>
	);
};

export default Input;
