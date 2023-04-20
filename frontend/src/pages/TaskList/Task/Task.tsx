import React, { FC } from 'react';

import { ITask } from '../../../types/Tasks';
import { ModalModeType } from '../../../types/ModalModeType';
import { useGetCategoriesQuery } from '../../../store/categories/categoriesApi';

import styles from './Task.module.scss';

type TaskPropsType = {
	task: ITask;
	setEditedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
	setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
	setMode: React.Dispatch<React.SetStateAction<ModalModeType>>;
	delTaskHandler: (task: ITask) => void;
};

const Task: FC<TaskPropsType> = ({
	task,
	setEditedTask,
	setActiveModal,
	setMode,
	delTaskHandler,
}) => {
	const {
		title,
		description,
		estimationTotal,
		deadline,
		isActive,
		priority,
		category,
	} = task;
	const { data: categList } = useGetCategoriesQuery();
	const taskCateg = categList?.find((categ) => categ._id === category);
	const date = new Date(deadline);
	const day = date.getDate();
	const month = date.toLocaleString('en', { month: 'short' });
	const today = new Date().toDateString() === date.toDateString();

	function handleEdit(task: ITask) {
		setMode('edit');
		setEditedTask(task);
		setActiveModal(true);
	}

	return (
		<div
			className={`${styles.taskWrapper} ${
				styles[isActive ? '' : 'doneBackgroud']
			}`}
		>
			<div className={styles.deadLine}>
				<div
					className={styles.marker}
					style={{ backgroundColor: `${taskCateg?.color}` }}
				></div>
				{today && <div className={styles.deadLineToday}>{`today`}</div>}
				{!today && (
					<>
						<div className={styles.deadLineDay}>{`${day}`}</div>
						<div className={styles.deadLineMonth}>{`${month}`}</div>
					</>
				)}
			</div>
			<div className={styles.contentWrapper}>
				<div>
					<h4
						className={`${styles.taskTitle} ${
							styles[isActive ? '' : 'doneTitle']
						} ${styles[`title-color-${priority}`]}`}
					>
						{title}
					</h4>
					<p className={styles.taskDescription}>{description}</p>
				</div>
				{isActive && (
					<ul className={styles.buttonsHolder}>
						<li>
							<button
								className={`${styles.taskButton} icon-arrows-up`}
							></button>
						</li>
						<li>
							<button
								className={`${styles.taskButton} icon-edit`}
								onClick={() => {
									handleEdit(task);
								}}
							></button>
						</li>
						<li>
							<button
								className={`${styles.taskButton} icon-delete`}
								onClick={() => {
									delTaskHandler(task);
								}}
							></button>
						</li>
					</ul>
				)}
			</div>
			<button
				className={`${styles.taskEstimation} ${
					styles[`bg-${priority}`]
				} icon-tomato`}
				disabled={!isActive}
			>
				{estimationTotal}
			</button>
		</div>
	);
};

export default Task;
