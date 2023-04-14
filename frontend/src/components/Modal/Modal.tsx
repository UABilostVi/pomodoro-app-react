import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

import { Button } from '../../common/Button';

import styles from './Modal.module.scss';

type ModalPropsType = {
	children: React.ReactNode;
	isValid: boolean;
	onSubmit: () => void;
	resetForm: () => void;
	activeModal: boolean;
	setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
	editMode: boolean;
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: FC<ModalPropsType> = ({
	isValid,
	children,
	onSubmit,
	resetForm,
	activeModal,
	setActiveModal,
	editMode,
	setEditMode,
}) => {
	const [title, setTitle] = useState('');

	function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setEditMode(false);
		setActiveModal(false);
	}

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
							onSubmit={onSubmit}
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
