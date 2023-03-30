import React, { FC } from 'react';
import styles from './SettingsItem.module.scss';

type optionType = 'workTime' | 'workIter' | 'shortBreak' | 'longBreak';

type SettingsItemPropsType = {
	value: number;
	title: string;
	option: optionType;
	max: number;
	min: number;
	step: number;
	increase: (step: number) => void;
	decrease: (step: number) => void;
};

const SettingsItem: FC<SettingsItemPropsType> = ({
	value,
	title,
	option,
	max,
	min,
	step,
	increase,
	decrease,
}) => {
	const measure = option === 'workIter' ? 'iterations' : 'minutes';

	return (
		<div className={`${styles.item} ${styles[option]}`}>
			<div className={styles.itemContext}>
				<span className={styles.itemTitle}>{title}</span>
				<div className={styles.inputWrapper}>
					<button
						className={`${styles.button} icon-minus`}
						onClick={() => decrease(step)}
						disabled={value === min}
					></button>
					<input
						className={styles.inputNumber}
						value={value}
						type='number'
						readOnly={true}
					/>
					<button
						className={`${styles.button} icon-plus`}
						onClick={() => increase(step)}
						disabled={value === max}
					></button>
				</div>
			</div>
			<p>
				Please select a value between {min} and {max}{' '}
				<span className={styles.markedText}>{measure}</span>
			</p>
		</div>
	);
};

export default SettingsItem;
