import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

import { ICategory } from '../../../types/Category';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';

import {
	useAddCategoryMutation,
	useEditCategoryMutation,
} from '../../../store/categories/categoriesApi';
import { ModalModeType } from '../../../types/ModalModeType';

type FormValues = {
	name: string;
	color: string;
};

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
	useEffect(() => {
		if (mode === 'edit' && editedCategory) {
			setValue('name', `${editedCategory?.name}`);
			setValue('color', `${editedCategory?.color}`);
		} else {
			setValue('name', '');
			setValue('color', '#000');
		}
	}, [editedCategory, mode]);

	const [createCategory] = useAddCategoryMutation();
	const [editCategory] = useEditCategoryMutation();
	const modalRoot = document.getElementById('root-modal') as HTMLElement;

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		if (mode === 'edit') {
			editCategory({ ...data, _id: editedCategory?._id });
		} else {
			createCategory(data);
		}
		setActiveModal(false);
	};

	function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setActiveModal(false);
	}

	return ReactDOM.createPortal(
		<Transition in={activeModal} timeout={200} mountOnEnter unmountOnExit>
			{(state) => {
				return (
					<div className={`modal ${state}`}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={`modalContent ${state}`}
						>
							<ul className={`ModalButtonsHolder`}>
								<li>
									<button
										type='button'
										className={`modalButton icon-close`}
										onClick={handleClose}
									></button>
								</li>
								<li>
									<button
										type='submit'
										className={`modalButton icon-check`}
										disabled={!isValid}
									></button>
								</li>
							</ul>
							<div>
								<h2 className={`modalTitle`}>{mode}</h2>
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
							</div>
							<div className={`phoneButtonsHolder`}>
								<Button
									buttonType='button'
									customType='cancel'
									onClickHandler={handleClose}
								>
									Cancel
								</Button>
								<Button
									buttonType='submit'
									customType='save'
									disabled={!isValid}
								>
									Save
								</Button>
							</div>
						</form>
					</div>
				);
			}}
		</Transition>,
		modalRoot
	);
};

export default CategoryModal;
