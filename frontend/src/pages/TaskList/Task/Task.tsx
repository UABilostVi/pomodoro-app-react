import React, { FC } from 'react';

import { ITask } from '../../../types/Tasks';
import { useGetCategoriesQuery } from '../../../store/categories/categoriesApi';

import styles from './Task.module.scss';
import { useDelTaskMutation } from '../../../store/tasks/tasksApi';

type TaskPropsType = {
	task: ITask;
};

const Task: FC<TaskPropsType> = ({ task }) => {
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
	const [delTask, {}] = useDelTaskMutation();
	const taskCateg = categList?.find((categ) => categ._id === category);
	const date = new Date(deadline);
	const day = date.getDate();
	const month = date.toLocaleString('en', { month: 'short' });
	const today = new Date().toDateString() === date.toDateString();

	function onDelete(task: ITask) {
		// eslint-disable-next-line no-restricted-globals
		const res = confirm('Del?');
		if (res) {
			delTask(task);
		}
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
							<button className={`${styles.taskButton} icon-edit`}></button>
						</li>
						<li>
							<button
								className={`${styles.taskButton} icon-delete`}
								onClick={() => {
									onDelete(task);
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
