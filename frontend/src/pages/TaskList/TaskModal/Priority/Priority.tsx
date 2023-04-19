import { FC } from 'react';
import { Input } from '../../../../common/Input';
import { ModalModeType } from '../../../../types/ModalModeType';
import { PriorityEmun } from '../../../../types/PriorityEmun';
import { ITask } from '../../../../types/Tasks';

import styles from './Priority.module.scss';

type PriorityPropsType = {
	mode: ModalModeType;
	editedTask: ITask | null;
	priority: {
		onDefault: (val?: string | number | undefined) => void;
		error: string;
		value: any;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		onBlur: () => void;
		isDirty: boolean;
	};
};

const Priority: FC<PriorityPropsType> = ({ priority, mode, editedTask }) => {
	const priorityList = Object.keys(PriorityEmun).filter((v) =>
		isNaN(Number(v))
	);

	return (
		<Input
			legendText='Priority:'
			error={priority.error}
			isDirty={priority.isDirty}
		>
			<div className={styles.priorityWrapper}>
				{priorityList.map((priorityItem, index) => {
					const isChecked =
						priorityItem === editedTask?.priority && mode === 'edit';
					return (
						<div key={index} className={styles.priorityHolder}>
							<input
								id={`${priorityItem}radio`}
								name='priority'
								className={styles[`${priorityItem}radio`]}
								type='radio'
								value={priorityItem}
								defaultChecked={isChecked}
								onChange={(e) => priority.onChange(e)}
							/>
							<label
								htmlFor={`${priorityItem}radio`}
								className={styles.priorityLabel}
							>
								{priorityItem}
							</label>
						</div>
					);
				})}
			</div>
		</Input>
	);
};

export default Priority;
