import { FC } from 'react';
import { FieldError } from 'react-hook-form';

import { ICategory } from '../../types/Category';

import styles from './Select.module.scss';

type RegisterDataProps = [string, object];

type InputProps = {
	categories: ICategory[];
	labelText: string;
	error?: FieldError;
	register: Function;
	registerData: RegisterDataProps;
};

const Select: FC<InputProps> = ({
	categories,
	labelText,
	error,
	register,
	registerData,
}) => {
	return (
		<div className={styles.selectWrapper}>
			<label htmlFor='category' className={styles.customSelect}>
				{labelText}
			</label>
			<select name='category' {...register(...registerData)}>
				{categories.map((category) => {
					return (
						<option
							value={category._id}
							key={category._id}
							style={{ color: `${category.color}` }}
						>
							{category.name}
						</option>
					);
				})}
			</select>
			{error && (
				<div className={styles.err}>{error?.message || 'Error occured'}</div>
			)}
		</div>
	);
};

export default Select;
