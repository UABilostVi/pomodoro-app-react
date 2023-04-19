import { FC } from 'react';
import { Input } from '../../../../common/Input';
import { ModalModeType } from '../../../../types/ModalModeType';
import { ITask } from '../../../../types/Tasks';

import styles from './Estimations.module.scss';

type EstimationsPropsType = {
	mode: ModalModeType;
	editedTask: ITask | null;
	estimationTotal: {
		onDefault: (val?: string | number) => void;
		error: string;
		value: any;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		onBlur: () => void;
		isDirty: boolean;
	};
};

const Estimations: FC<EstimationsPropsType> = ({
	mode,
	editedTask,
	estimationTotal,
}) => {
	return (
		<Input
			legendText='Estimations:'
			error={estimationTotal.error}
			isDirty={estimationTotal.isDirty}
		>
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
							onChange={(e) => estimationTotal.onChange(e)}
						/>
					);
				})}
			</div>
		</Input>
	);
};

export default Estimations;
