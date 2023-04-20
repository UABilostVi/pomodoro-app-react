import React, { FC, useState } from 'react';
import {
	useDelTaskMutation,
	useGetTasksQuery,
} from '../../store/tasks/tasksApi';
import { Tabs } from '../../components/Tabs';
import { Task } from './Task';
import { ITask } from '../../types/Tasks';
import { ModalModeType } from '../../types/ModalModeType';
import { TaskModal } from './TaskModal';

import styles from './TaskList.module.scss';
import { Dialog } from '../../components/Dialog';

const TaskList: FC = () => {
	const [isActiveModal, setActiveModal] = useState<boolean>(false);
	const [isActiveDialog, setActiveDialog] = useState<boolean>(false);
	const { data } = useGetTasksQuery();
	const statusTabs = ['To do', 'Done'];
	const [statusState, setStatusState] = useState<string>(statusTabs[0]);
	const [mode, setMode] = useState<ModalModeType>('add');
	const [editedTask, setEditedTask] = useState<ITask | null>(null);
	const [deletedTask, setDeletedTask] = useState<ITask | null>(null);
	const [delTask] = useDelTaskMutation();

	function addTaskHandler() {
		setMode('add');
		setActiveModal(true);
		setEditedTask(null);
	}

	function delTaskHandler(task: ITask) {
		setActiveDialog(true);
		setDeletedTask(task);
	}

	function onRemove() {
		if (deletedTask) {
			delTask(deletedTask);
			setActiveDialog(false);
		}
	}

	return (
		<>
			<div className={statusState === 'To do' ? styles.tabsHolder : ''}>
				{statusState === 'To do' && (
					<button
						className={`${styles.addTaskButton}`}
						onClick={() => addTaskHandler()}
					>
						Add new task <span className={`${styles.plus} icon-plus`}></span>
					</button>
				)}
				<Tabs
					tabsItems={statusTabs}
					setToggleState={setStatusState}
					tabState={statusState}
				/>
			</div>

			<div>
				{data?.length === 0 && <div>No tasks</div>}
				{data
					?.filter((task) =>
						statusState === 'To do' ? task.isActive : !task.isActive
					)
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
					})}
			</div>
			<TaskModal
				activeModal={isActiveModal}
				setActiveModal={setActiveModal}
				mode={mode}
				editedTask={editedTask}
			/>
			<Dialog
				activeDialog={isActiveDialog}
				setActiveDialog={setActiveDialog}
				onRemove={onRemove}
			/>
		</>
	);
};

export default TaskList;
