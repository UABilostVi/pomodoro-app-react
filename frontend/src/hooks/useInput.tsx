import { useState } from 'react';
import { IValidation } from '../types/Validations';
import { useValidation } from './useValidation';

export const useInput = (initialValue: string, validations: IValidation) => {
	const [value, setValue] = useState<string>(initialValue);
	const [isDirty, setDirty] = useState<boolean>(false);
	const valid = useValidation(value, validations);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onBlur = () => {
		setDirty(true);
	};

	return {
		value,
		isDirty,
		onChange,
		onBlur,
		...valid,
	};
};
