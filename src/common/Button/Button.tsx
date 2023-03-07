import React from 'react';

import './button.css';

const Button = (props: any) => {
	let classes = 'button';
	classes += props.centered === true ? ' centered' : '';
	classes += props.serviceButton === true ? ' service-button' : '';
	return (
		<button
			id={props.id}
			className={classes}
			type={props.type}
			onClick={props.onClick}
		>
			{props.buttonText}
		</button>
	);
};

export default Button;
