import { FC, FormEvent } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

import { Button } from '../../common/Button';
import { ModalModeType } from '../../types/ModalModeType';

import styles from './Modal.module.scss';

const modalRoot = document.getElementById('root-modal') as HTMLElement;

type ModalPropsType = {
	children: React.ReactNode;
	activeModal: boolean;
	isDisabled: boolean;
	mode: ModalModeType;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	handleClose: any;
};

const Modal: FC<ModalPropsType> = ({
	children,
	activeModal,
	isDisabled,
	mode,
	onSubmit,
	handleClose,
}) => {
	return ReactDOM.createPortal(
		<Transition in={activeModal} timeout={200} mountOnEnter unmountOnExit>
			{(state) => {
				return (
					<div className={`${styles.modal} ${styles[state]}`}>
						<form
							onSubmit={onSubmit}
							className={`${styles.modalContent} ${styles[state]}`}
						>
							<ul className={styles.modalButtonsHolder}>
								<li>
									<button
										type='button'
										className={`${styles.modalButton} icon-close`}
										onClick={handleClose}
									></button>
								</li>
								<li>
									<button
										type='submit'
										className={`${styles.modalButton} icon-check`}
										disabled={isDisabled}
									></button>
								</li>
							</ul>
							<div>
								<h2 className={styles.modalTitle}>{mode}</h2>
								{children}
							</div>
							<div className={styles.phoneButtonsHolder}>
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
									disabled={isDisabled}
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
