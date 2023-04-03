import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './Select.module.scss';
import { ICategory } from '../../types/Category';
import styled from 'styled-components';

type RegisterDataProps = [string, object];

type InputProps = {
	categories: ICategory[];
	labelText: string;
	error?: FieldError;
	register: Function;
	registerData: RegisterDataProps;
};

interface IOptionProps {
	color: string;
}

const Select: FC<InputProps> = ({
	categories,
	labelText,
	error,
	register,
	registerData,
}) => {
	const OptionItem = styled.option`
		color: ${(props: IOptionProps) => props.color};
	`;

	return (
		<div className={styles.selectWrapper}>
			<label htmlFor='category' className={styles.customSelect}>
				{labelText}
			</label>
			<select name='category' {...register(...registerData)}>
				{categories.map((category) => {
					return (
						<OptionItem
							value={category.id}
							key={category.id}
							color={category.color}
						>
							{category.name}
						</OptionItem>
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
