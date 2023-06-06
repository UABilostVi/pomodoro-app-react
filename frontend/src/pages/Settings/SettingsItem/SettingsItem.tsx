import React, { FC, SetStateAction } from 'react';
import styles from './SettingsItem.module.scss';

type optionType = 'worktime' | 'iterations' | 'shortbreak' | 'longbreak';

type SettingsItemPropsType = {
	value: number;
	title: string;
	option: optionType;
	max: number;
	min: number;
	step: number;
	setValue: React.Dispatch<SetStateAction<number>>;
};

const SettingsItem: FC<SettingsItemPropsType> = ({
	value,
	title,
	option,
	max,
	min,
	step,
	setValue,
}) => {
	const measure = option === 'iterations' ? 'iterations' : 'minutes';

	return (
		<div className={`${styles.item} ${styles[option]}`}>
			<div className={styles.itemContext}>
				<span className={styles.itemTitle}>{title}</span>
				<div className={styles.inputWrapper}>
					<button
						className={`${styles.button} icon-minus`}
						onClick={() => setValue((prev) => prev - step)}
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
						onClick={() => setValue((prev) => prev + step)}
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
