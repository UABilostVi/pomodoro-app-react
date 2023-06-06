import { FC } from 'react';

import { ICategory } from '../../types/Category';

import styles from './Select.module.scss';

type SelectProps = {
	categories?: ICategory[];
	labelText: string;
	error?: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	value?: string;
	isDirty: boolean;
};

const Select: FC<SelectProps> = ({
	categories,
	labelText,
	error,
	onChange,
	value,
	isDirty,
}) => {
	return (
		<div className={styles.selectWrapper}>
			<label htmlFor='category' className={styles.customSelect}>
				{labelText}
			</label>
			<select
				defaultValue={value}
				name='category'
				id='category'
				onChange={onChange}
			>
				{categories?.map((category) => {
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
			{error && isDirty && (
				<div className={styles.err}>{error || 'Error occured'}</div>
			)}
		</div>
	);
};

export default Select;
