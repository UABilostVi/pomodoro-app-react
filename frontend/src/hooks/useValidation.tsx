import { useEffect, useState } from 'react';
import { IValidation } from '../types/Validations';

export const useValidation = (value: string, validations: IValidation) => {
	const [isEmpty, setIsEmpty] = useState<boolean>(true);
	const [minLengthErr, setMinLengthErr] = useState<boolean>(false);
	const [maxLengthErr, setMaxLengthErr] = useState<boolean>(false);
	const [emailErr, setEmailErr] = useState<boolean>(false);
	const [inpuValid, setInputValid] = useState<boolean>(false);

	useEffect(() => {
		for (const val in validations) {
			switch (val) {
				case 'minLength':
					value.length < validations[val]
						? setMinLengthErr(true)
						: setMinLengthErr(false);
					break;
				case 'maxLength':
					value.length > validations[val]
						? setMaxLengthErr(true)
						: setMaxLengthErr(false);
					break;
				case 'isEmpty':
					value ? setIsEmpty(false) : setIsEmpty(true);
					break;
				case 'isEmail':
					const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
					re.test(String(value).toLowerCase())
						? setEmailErr(false)
						: setEmailErr(true);
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
	};
};
