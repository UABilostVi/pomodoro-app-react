import { FC } from 'react';
import { FieldError } from 'react-hook-form';
import { Input } from '../../../../common/Input';

type RegisterDataProps = [string, object?];

type InputProps = {
	labelText?: string;
	error?: FieldError;
	register: Function;
	registerData: RegisterDataProps;
};

const Estimation: FC<InputProps> = ({
	labelText,
	error,
	register,
	registerData,
}) => {
	return (
		<label>
			{labelText}
			<input
				type='radio'
				name='estimation'
				value={1}
				{...register(...registerData)}
			/>
			<input
				type='radio'
				name='estimation'
				value={2}
				{...register(...registerData)}
			/>
		</label>
	);
};

export default Estimation;
