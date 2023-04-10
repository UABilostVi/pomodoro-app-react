import React, { FC, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Modal } from '../../../components/Modal';
import { Input } from '../../../common/Input';

import { CategModalContext } from '../SettingsCategories/SettingsCategories';

type FormValues = {
	name: string;
	color: string;
};

const CategoryModal: FC = () => {
	const { editedCategory, editMode } = useContext(CategModalContext);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		mode: 'onChange',
	});

	useEffect(() => {
		if (editMode) {
			setValue('name', `${editedCategory.name}`);
			setValue('color', `${editedCategory.color}`);
		}
	}, [editedCategory, editMode]);

	return (
		<Modal isValid={isValid} handleSubmit={handleSubmit} resetForm={reset}>
			<Input legendText='Name:' error={errors.name}>
				<input
					type='text'
					placeholder='Enter category name'
					{...register('name', {
						required: 'Must be filled',
						minLength: {
							value: 3,
							message: 'Min length 3',
						},
						maxLength: {
							value: 30,
							message: 'Max length 30',
						},
					})}
				/>
			</Input>
			<Input legendText='Choose color:' error={errors.color}>
				<input
					type='color'
					{...register('color', {
						required: 'Must be filled',
					})}
				/>
			</Input>
		</Modal>
	);
};

export default CategoryModal;
