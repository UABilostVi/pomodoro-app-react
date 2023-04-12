import React, { FC, useContext, useState } from 'react';
import {
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormReset,
} from 'react-hook-form';

import { CategModalContext } from '../../pages/Settings/SettingsCategories/SettingsCategories';
import { Button } from '../../common/Button';

import {
	useAddCategoryMutation,
	useEditCategoryMutation,
} from '../../store/categories/categoriesApi';

import styles from './Modal.module.scss';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

type ModalPropsType = {
	children: React.ReactNode;
	isValid: boolean;
	handleSubmit: UseFormHandleSubmit<FormValues>;
	resetForm: UseFormReset<FormValues>;
};

type FormValues = {
	name: string;
	color: string;
};

const Modal: FC<ModalPropsType> = ({
	isValid,
	children,
	handleSubmit,
	resetForm,
}) => {
	const [createCategory, {}] = useAddCategoryMutation();
	const [editCategory, {}] = useEditCategoryMutation();
	const [title, setTitle] = useState('');

	const { editedCategory, activeModal, setActiveModal, editMode, setEditMode } =
		useContext(CategModalContext);

	function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setEditMode(null);
		setActiveModal(false);
	}

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		if (editMode) {
			editCategory({ ...data, _id: editedCategory._id });
			setEditMode(null);
		} else {
			createCategory(data);
		}
		setActiveModal(false);
	};

	const modalRoot = document.getElementById('root-modal') as HTMLElement;

	return ReactDOM.createPortal(
		<Transition in={activeModal} timeout={200} mountOnEnter unmountOnExit>
			{(state) => {
				if (state === 'exited') {
					if (editMode) {
						setTitle('Edit');
					} else {
						setTitle('Add');
					}
					resetForm();
				}
				return (
					<div className={`${styles.modal} ${styles[state]}`}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={`${styles.modalContent} ${styles[state]}`}
						>
							<ul className={styles.buttonsHolder}>
								<li>
									<button
										type='button'
										className={`${styles.button} icon-close`}
										onClick={handleClose}
									></button>
								</li>
								<li>
									<button
										type='submit'
										className={`${styles.button} icon-check`}
										disabled={!isValid}
									></button>
								</li>
							</ul>
							<div>
								<h2 className={styles.title}>{title}</h2>
								{children}
							</div>
							<div className={`${styles.phoneButtonsHolder}`}>
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

export default Modal;
