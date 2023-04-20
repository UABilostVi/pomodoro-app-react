import { FC } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

import { Button } from '../../common/Button';

import styles from './Dialog.module.scss';

const modalRoot = document.getElementById('root-modal') as HTMLElement;

type DialogPropsType = {
	activeDialog: boolean;
	setActiveDialog: React.Dispatch<React.SetStateAction<boolean>>;
	onRemove: React.MouseEventHandler<HTMLButtonElement>;
};

const Dialog: FC<DialogPropsType> = ({
	activeDialog,
	setActiveDialog,
	onRemove,
}) => {
	function onClose() {
		setActiveDialog(false);
	}

	return ReactDOM.createPortal(
		<Transition in={activeDialog} timeout={200} mountOnEnter unmountOnExit>
			{(state) => {
				return (
					<div className={`${styles.dialog} ${styles[state]}`}>
						<div className={`${styles.dialogContent} ${styles[state]}`}>
							<h2 className={styles.dialogTitle}>Remove</h2>
							<p className={styles.dialogMessage}>
								Are you sure you want to remove selected task(s)?
							</p>
							<div className={styles.phoneButtonsHolder}>
								<Button
									buttonType='button'
									customType='ok'
									onClickHandler={onClose}
								>
									Cancel
								</Button>
								<Button
									buttonType='submit'
									customType='cancel'
									onClickHandler={onRemove}
								>
									Remove
								</Button>
							</div>
						</div>
					</div>
				);
			}}
		</Transition>,
		modalRoot
	);
};

export default Dialog;
