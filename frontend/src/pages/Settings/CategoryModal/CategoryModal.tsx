import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Modal } from '../../../components/Modal';
import { Input } from '../../../common/Input';

import {
	useAddCategoryMutation,
	useEditCategoryMutation,
} from '../../../store/categories/categoriesApi';
import { ICategory } from '../../../types/Category';

type FormValues = {
	name: string;
	color: string;
};

type CategModalType = {
	activeModal: boolean;
	setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
	editMode: boolean;
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	editedCategory: ICategory | null;
	setEditedCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
};

const CategoryModal: FC<CategModalType> = ({
	activeModal,
	editedCategory,
	setActiveModal,
	editMode,
	setEditMode,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		mode: 'onChange',
	});

	const [createCategory, {}] = useAddCategoryMutation();
	const [editCategory, {}] = useEditCategoryMutation();

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		if (editMode) {
			editCategory({ ...data, _id: editedCategory?._id });
			setEditMode(false);
		} else {
			createCategory(data);
		}
		setActiveModal(false);
	};

	useEffect(() => {
		if (editMode) {
			setValue('name', `${editedCategory?.name}`);
			setValue('color', `${editedCategory?.color}`);
		}
	}, [editedCategory, editMode]);

	return (
		<Modal
			isValid={isValid}
			onSubmit={handleSubmit(onSubmit)}
			resetForm={reset}
			activeModal={activeModal}
			editMode={editMode}
			setActiveModal={setActiveModal}
			setEditMode={setEditMode}
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

export default CategoryModal;
