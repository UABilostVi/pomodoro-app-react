import React, { FC, useState } from 'react';
import { useDelTaskMutation } from '../../store/tasks/tasksApi';
import { Tabs } from '../../components/Tabs';
import { ITask } from '../../types/Tasks';
import { ModalModeType } from '../../types/ModalModeType';
import { TaskModal } from './TaskModal';

import { Dialog } from '../../components/Dialog';
import { useNotification } from '../../components/Notification/NotificationProvider';
import { useGetCategoriesQuery } from '../../store/categories/categoriesApi';
import { Tasks } from './Tasks';

import styles from './TaskList.module.scss';

const TaskList: FC = () => {
	const [isActiveModal, setActiveModal] = useState<boolean>(false);
	const [isActiveDialog, setActiveDialog] = useState<boolean>(false);
	const statusTabs = ['To do', 'Done'];
	const [statusState, setStatusState] = useState<string>(statusTabs[0]);
	const [mode, setMode] = useState<ModalModeType>('add');
	const [editedTask, setEditedTask] = useState<ITask | null>(null);
	const [deletedTask, setDeletedTask] = useState<ITask | null>(null);
	const [delTask] = useDelTaskMutation();
	const dispatchNotification = useNotification();
	const { data: categories } = useGetCategoriesQuery();

	function addTaskHandler() {
		if (!categories) {
			dispatchNotification({
				type: 'warning',
				message: 'You should add categories first!',
			});
		} else {
			setMode('add');
			setActiveModal(true);
			setEditedTask(null);
		}
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
			<Tasks
				delTaskHandler={delTaskHandler}
				setActiveModal={setActiveModal}
				setEditedTask={setEditedTask}
				setMode={setMode}
				statusState={statusState}
			/>
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
