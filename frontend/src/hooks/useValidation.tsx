import { useEffect, useState } from 'react';
import { IValidations } from '../types/Validations';

export const useValidation = <T,>(value: T, validations: IValidations) => {
	const [error, setError] = useState<string>('');
	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case 'minLength':
					String(value).trim().length < validations[validation]
						? setError(`Min ${validations[validation]} symbols`)
						: setError('');
					break;
				case 'maxLength':
					String(value).trim().length > validations[validation]
						? setError(`Max ${validations[validation]} symbols`)
						: setError('');
					break;
				case 'isEmpty':
					value ? setError('') : setError('Must be filled');
					break;
				case 'isEmail':
					const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
					regExp.test(String(value).trim().toLocaleLowerCase())
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
