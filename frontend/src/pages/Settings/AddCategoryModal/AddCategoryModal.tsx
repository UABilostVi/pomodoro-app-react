import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Modal } from '../../../components/Modal';
import { Input } from '../../../common/Input';

import { ICategory } from '../../../types/Category';

type AddCategoryModalProps = {
	activeModal: boolean;
	setActiveModal: (state: boolean) => void;
	editMode: boolean;
	editedCategory?: ICategory;
	setEditMode: Function;
};

type FormValues = {
	name: string;
	color: string;
};

const AddCategoryModal: FC<AddCategoryModalProps> = ({
	activeModal,
	setActiveModal,
	editMode,
	editedCategory,
	setEditMode,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isValid },
	} = useForm<FormValues>({ mode: 'onChange' });

	useEffect(() => {
		if (editedCategory) {
			setValue('name', `${editedCategory.name}`);
			setValue('color', `${editedCategory.color}`);
		}
	}, [editedCategory]);

	return (
		<Modal
			activeModal={activeModal}
			setEditMode={setEditMode}
			setActive={setActiveModal}
			editedCategory={editedCategory?._id}
			title={editMode ? 'Edit category' : 'Add category'}
			isValid={isValid}
			handleSubmit={handleSubmit}
			resetForm={reset}
		>
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

export default AddCategoryModal;
