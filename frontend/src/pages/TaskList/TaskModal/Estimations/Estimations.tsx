import { FC } from 'react';
import { Input } from '../../../../common/Input';
import { ModalModeType } from '../../../../types/ModalModeType';
import { ITask } from '../../../../types/Tasks';

import styles from './Estimations.module.scss';

type EstimationsPropsType = {
	editedTask: ITask | null;
	mode: ModalModeType;
	error: string;
	isDirty: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Estimations: FC<EstimationsPropsType> = ({
	mode,
	editedTask,
	error,
	isDirty,
	onChange,
}) => {
	return (
		<Input legendText='Estimations:' error={error} isDirty={isDirty}>
			<div className={styles.estimationHolder}>
				{[...Array(5)].map((e, i) => {
					const val = (i - 5) * -1;
					const isChecked =
						val === editedTask?.estimationTotal && mode === 'edit';

					return (
						<input
							key={val}
							name='setEstimationTotal'
							className={styles.estimationsInput}
							type='radio'
							value={val}
							defaultChecked={isChecked}
							onChange={(e) => onChange(e)}
						/>
					);
				})}
			</div>
		</Input>
	);
};

export default Estimations;
