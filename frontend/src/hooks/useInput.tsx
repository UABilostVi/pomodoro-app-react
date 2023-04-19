import { useState } from 'react';
import { useValidation } from './useValidation';

const useInput = (initialValue: any, validations?: any) => {
	const [value, setValue] = useState(initialValue);
	const [isDirty, setIsDirty] = useState<boolean>(false);
	const valid = useValidation(value, validations);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onDefault = (val?: string | number) => {
		setIsDirty(false);
		setValue(val);
	};

	const onBlur = () => {
		setIsDirty(true);
	};

	return { value, onChange, onBlur, isDirty, ...valid, onDefault };
};

export default useInput;
