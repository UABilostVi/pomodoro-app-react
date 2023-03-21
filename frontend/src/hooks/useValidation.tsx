import { useEffect, useState } from 'react';
import { IValidation } from '../types/Validations';

export const useValidation = (value: string, validations: IValidation) => {
	const [isEmpty, setIsEmpty] = useState<string>('');
	const [minLengthErr, setMinLengthErr] = useState<string>('');
	const [maxLengthErr, setMaxLengthErr] = useState<string>('');
	const [emailErr, setEmailErr] = useState<string>('');
	const [inpuValid, setInputValid] = useState<boolean>(false);
	const err = isEmpty || minLengthErr || maxLengthErr || emailErr;

	useEffect(() => {
		for (const val in validations) {
			switch (val) {
				case 'minLength':
					value.length < validations[val]
						? setMinLengthErr(`Min length must be ${validations[val]} chars`)
						: setMinLengthErr('');
					break;
				case 'maxLength':
					value.length > validations[val]
						? setMaxLengthErr(`Max length must be ${validations[val]} chars`)
						: setMaxLengthErr('');
					break;
				case 'isEmpty':
					value ? setIsEmpty('') : setIsEmpty('Must be filled');
					break;
				case 'isEmail':
					const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
					re.test(String(value).toLowerCase())
						? setEmailErr('')
						: setEmailErr('Wrong email format');
					break;
			}
		}
	}, [value, validations]);

	useEffect(() => {
		if (isEmpty || minLengthErr || maxLengthErr || emailErr) {
			setInputValid(false);
		} else {
			setInputValid(true);
		}
	}, [isEmpty, minLengthErr, maxLengthErr, emailErr]);

	return {
		isEmpty,
		minLengthErr,
		maxLengthErr,
		emailErr,
		inpuValid,
		err,
	};
};
