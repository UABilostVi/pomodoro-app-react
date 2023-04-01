import React, { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Button } from '../../common/Button';

import styles from './Modal.module.scss';

type ModalPropsType = {
	transitionClass: string;
	setActive: (state: boolean) => void;
	title: string;
	children: React.ReactNode;
	isValid: boolean;
	handleSubmit: Function;
};

type FormValues = {
	name: string;
	color: string;
};

const Modal: FC<ModalPropsType> = ({
	transitionClass,
	setActive,
	title,
	isValid,
	children,
	handleSubmit,
}) => {
	function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setActive(false);
	}

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
		setActive(false);
	};

	return (
		<div className={`${styles.modal} ${styles[transitionClass]}`}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`${styles.modalContent} ${styles[transitionClass]}`}
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
					<Button buttonType='submit' customType='save' disabled={!isValid}>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Modal;
