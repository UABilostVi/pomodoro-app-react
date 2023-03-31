import React, { FC } from 'react';

import styles from './Modal.module.scss';

type ModalPropsType = {
	active: boolean;
	setActive: (state: boolean) => void;
	title: string;
	children: React.ReactNode;
	isValid: boolean;
};

const Modal: FC<ModalPropsType> = ({
	active,
	setActive,
	title,
	isValid,
	children,
}) => {
	return (
		<div
			className={
				active ? `${styles.modal} ${styles.activeModal}` : styles.modal
			}
		>
			<div
				className={
					active
						? `${styles.modalContent} ${styles.activeModalContent}`
						: styles.modalContent
				}
			>
				<ul className={styles.buttonsHolder}>
					<li>
						<button
							className={`${styles.button} icon-close`}
							onClick={() => setActive(false)}
						></button>
					</li>
					<li>
						<button
							className={`${styles.button} icon-check`}
							disabled={!isValid}
						></button>
					</li>
				</ul>
				<h2 className={styles.title}>{title}</h2>
				{children}
			</div>
		</div>
	);
};

export default Modal;
