import { FC } from 'react';
import { useGetTasksQuery } from '../../../store/tasks/tasksApi';
import { ModalModeType } from '../../../types/ModalModeType';
import { ITask } from '../../../types/Tasks';
import { Task } from '../Task';

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
	const { data: tasks } = useGetTasksQuery();
	const toDoTasks = tasks?.filter((task) => task.isActive);
	const doneTasks = tasks?.filter((task) => !task.isActive);
	const list = statusState === 'To do' ? toDoTasks : doneTasks;

	return (
		<div>
			{list?.length === 0 && <h2>No tasks</h2>}
			{list?.map((task) => {
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
	);
};

export default Tasks;
