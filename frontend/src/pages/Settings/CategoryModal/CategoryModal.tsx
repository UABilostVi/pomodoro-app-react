import React, { FC, useEffect } from 'react';

import useInput from '../../../hooks/useInput';
import { ModalModeType } from '../../../types/ModalModeType';
import { ICategory } from '../../../types/Category';

import { Input } from '../../../common/Input';
import { Modal } from '../../../components/Modal';

import {
	useAddCategoryMutation,
	useEditCategoryMutation,
} from '../../../store/categories/categoriesApi';

type CategModalType = {
	activeModal: boolean;
	setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
	mode: ModalModeType;
	setMode: React.Dispatch<React.SetStateAction<ModalModeType>>;
	editedCategory?: ICategory | null;
	setEditedCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
};

const CategoryModal: FC<CategModalType> = ({
	activeModal,
	editedCategory,
	setActiveModal,
	mode,
}) => {
	const [createCategory] = useAddCategoryMutation();
	const [editCategory] = useEditCategoryMutation();

	const name = useInput('', { maxLength: 30, minLength: 3 });
	const color = useInput('', { isEmpty: true });

	useEffect(() => {
		if (mode === 'edit' && editedCategory) {
			name.onDefault(editedCategory.name);
			color.onDefault(editedCategory.color);
		} else {
			name.onDefault('');
			color.onDefault('');
		}
	}, [activeModal]);

	const isDisabled = name.error || color.error ? true : false;

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const submitData = {
			name: name.value,
			color: color.value,
		};
		if (mode === 'edit') {
			editCategory({ ...submitData, _id: editedCategory?._id });
		} else {
			createCategory(submitData);
		}
		setActiveModal(false);
	}

	function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setActiveModal(false);
	}

	return (
		<Modal
			activeModal={activeModal}
			isDisabled={isDisabled}
			mode={mode}
			handleClose={handleClose}
			onSubmit={onSubmit}
		>
			<Input legendText='Name:' error={name.error} isDirty={name.isDirty}>
				<input
					type='text'
					placeholder='Enter category name'
					value={name.value}
					onChange={(e) => name.onChange(e)}
					onBlur={() => name.onBlur()}
				/>
			</Input>
			<Input
				legendText='Choose color:'
				error={color.error}
				isDirty={color.isDirty}
			>
				<input
					type='color'
					value={color.value}
					onChange={(e) => color.onChange(e)}
					onBlur={() => color.onBlur()}
				/>
			</Input>
		</Modal>
	);
};

export default CategoryModal;
