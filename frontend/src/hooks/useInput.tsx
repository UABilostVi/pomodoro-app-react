import { useState } from 'react';
import { useValidation } from './useValidation';
import { IValidations } from '../types/Validations';

function useInput<T>(initialValue: T, validations?: IValidations) {
	const [value, setValue] = useState<T>(initialValue);
	const [isDirty, setIsDirty] = useState<boolean>(false);
	const valid = useValidation<T>(value, validations as IValidations);

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setValue(e.target.value as T);
	};

	const onDefault = (val: T) => {
		setIsDirty(false);
		setValue(val);
	};

	const onBlur = () => {
		setIsDirty(true);
	};

	return { value, onChange, onBlur, isDirty, ...valid, onDefault };
}

export default useInput;
