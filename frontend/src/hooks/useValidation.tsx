import { useEffect, useState } from 'react';

export const useValidation = (value: any, validations: any) => {
	const [error, setError] = useState('');
	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case 'minLength':
					value.trim().length < validations[validation]
						? setError(`Min ${validations[validation]} symbols`)
						: setError('');
					break;
				case 'maxLength':
					value.trim().length > validations[validation]
						? setError(`Max ${validations[validation]} symbols`)
						: setError('');
					break;
				case 'isEmpty':
					value ? setError('') : setError('Must be filled');
					break;
				case 'isEmail':
					const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
					regExp.test(String(value.trim()).toLocaleLowerCase())
						? setError('')
						: setError('Wrong email format');
					break;
			}
		}
	}, [value]);

	return {
		error,
	};
};
