import { FC, useState } from 'react';
import { useGetTasksQuery } from '../../../store/tasks/tasksApi';
import { ModalModeType } from '../../../types/ModalModeType';
import { ITask } from '../../../types/Tasks';
import { Task } from '../Task';
import { PriorityEmun } from '../../../types/PriorityEmun';

import styles from './Tasks.module.scss';
import { NoTaskLeft } from '../NoTaskLeft';

type TasksPropsType = {
	statusState: string;
	setMode: React.Dispatch<React.SetStateAction<ModalModeType>>;
	setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
	setEditedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
	delTaskHandler: (task: ITask) => void;
};

const Tasks: FC<TasksPropsType> = ({
	statusState,
	setActiveModal,
	setMode,
	setEditedTask,
	delTaskHandler,
}) => {
	const { data: tasks = [] } = useGetTasksQuery();
	const toDoTasks = tasks.filter((task) => task.isActive);
	const doneTasks = tasks.filter((task) => !task.isActive);
	const list = statusState === 'To do' ? toDoTasks : doneTasks;
	const [sortGlobalState, setSortGlobalState] = useState<string>('dateAsc');
	const [sortDailyState, setSortDailyState] = useState<string>('priorityASC');

	const priorObject = Object.keys(PriorityEmun).filter((v) => isNaN(Number(v)));
	const sortMethods: any = {
		dateAsc: (a: ITask, b: ITask) =>
			new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
		dateDes: (a: ITask, b: ITask) =>
			new Date(b.deadline).getTime() - new Date(a.deadline).getTime(),

		priorityASC: (a: ITask, b: ITask) =>
			priorObject.indexOf(a.priority) - priorObject.indexOf(b.priority),
		priorityDES: (a: ITask, b: ITask) =>
			priorObject.indexOf(b.priority) - priorObject.indexOf(a.priority),
	};

	const dailyTasks = list
		.filter(
			(task) =>
				new Date(task.deadline).toLocaleDateString() ===
				new Date().toLocaleDateString()
		)
		.sort(sortMethods[sortDailyState])
		.map((task) => {
			return (
				<Task
					key={task._id}
					task={task}
					setEditedTask={setEditedTask}
					setActiveModal={setActiveModal}
					setMode={setMode}
					delTaskHandler={delTaskHandler}
				/>
			);
		});

	const globalTasks = list
		.filter(
			(task) =>
				new Date(task.deadline).toLocaleDateString() !==
				new Date().toLocaleDateString()
		)
		.sort(sortMethods[sortGlobalState])
		.map((task) => {
			return (
				<Task
					key={task._id}
					task={task}
					setEditedTask={setEditedTask}
					setActiveModal={setActiveModal}
					setMode={setMode}
					delTaskHandler={delTaskHandler}
				/>
			);
		});

	return (
		<>
			{list.length === 0 && statusState === 'To do' && <NoTaskLeft />}
			{list.length === 0 && statusState === 'Done' && (
				<h2 className={styles.noTasksBanner}>No finished task yet</h2>
			)}
			{list.length > 0 && (
				<>
					<div>
						{dailyTasks.length === 0 && (
							<p
								className={styles.noTasksBanner}
							>{`Excellent, all daily tasks done :)`}</p>
						)}
						{dailyTasks.length > 0 && (
							<>
								<div className={styles.tasksHeader}>
									<h3>Daily tasks</h3>
									<div>
										<label htmlFor='sortdaily'>Sort by:</label>
										<select
											name='sortdaily'
											id='sortdaily'
											defaultValue={sortDailyState}
											onChange={(e) => setSortDailyState(e.target.value)}
											className={styles.select}
										>
											<option value='priorityASC'>priorityASC</option>
											<option value='priorityDES'>priorityDES</option>
										</select>
									</div>
								</div>
								{dailyTasks}
							</>
						)}
					</div>

					<div>
						{globalTasks.length === 0 && (
							<p className={styles.noTasksBanner}>No global tasks</p>
						)}
						{globalTasks.length > 0 && (
							<>
								<div className={styles.tasksHeader}>
									<h3>Global tasks</h3>
									<div>
										<label htmlFor='sortdaily'>Sort by:</label>
										<select
											name='sortdaily'
											id='sortdaily'
											defaultValue={sortGlobalState}
											onChange={(e) => setSortGlobalState(e.target.value)}
											className={styles.select}
										>
											<option value='dateAsc'>dateASC</option>
											<option value='dateDes'>dateDES</option>
											<option value='priorityASC'>priorityASC</option>
											<option value='priorityDES'>priorityDES</option>
										</select>
									</div>
								</div>
								{globalTasks}
							</>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Tasks;
