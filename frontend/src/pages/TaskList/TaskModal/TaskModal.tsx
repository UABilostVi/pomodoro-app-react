import React, { FC, useEffect } from 'react';

import { ITask } from '../../../types/Tasks';
import { ModalModeType } from '../../../types/ModalModeType';

import { Input } from '../../../common/Input';
import { Select } from '../../../common/Select';
import { Modal } from '../../../components/Modal';
import { Priority } from './Priority';
import { Estimations } from './Estimations';

import useInput from '../../../hooks/useInput';
import { useGetCategoriesQuery } from '../../../store/categories/categoriesApi';
import {
	useAddTaskMutation,
	useEditTaskMutation,
} from '../../../store/tasks/tasksApi';

type TaskModalProps = {
	activeModal: boolean;
	setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
	mode: ModalModeType;
	editedTask: ITask | null;
};

const TaskModal: FC<TaskModalProps> = ({
	activeModal,
	mode,
	editedTask,
	setActiveModal,
}) => {
	const { data: categories } = useGetCategoriesQuery();
	const [editTask] = useEditTaskMutation();
	const [createTask] = useAddTaskMutation();

	const title = useInput<string>('', { maxLength: 30, minLength: 3 });
	const category = useInput<string>('', { isEmpty: true });
	const deadline = useInput<string>('', { isEmpty: true });
	const priority = useInput<string>('', { isEmpty: true });
	const description = useInput<string>('', { maxLength: 100, minLength: 3 });
	const estimationTotal = useInput<number>(0, { isEmpty: true });

	const isDisabled =
		title.error ||
		description.error ||
		deadline.error ||
		estimationTotal.error ||
		priority.error ||
		category.error
			? true
			: false;

	useEffect(() => {
		if (mode === 'edit' && editedTask) {
			title.onDefault(editedTask.title);
			description.onDefault(editedTask.description);
			deadline.onDefault(
				new Date(editedTask.deadline).toISOString().substr(0, 10)
			);
			estimationTotal.onDefault(editedTask.estimationTotal);
			priority.onDefault(editedTask.priority);
			category.onDefault(editedTask.category);
		} else if (mode === 'add' && categories) {
			title.onDefault('');
			description.onDefault('');
			deadline.onDefault('');
			estimationTotal.onDefault(0);
			priority.onDefault('');
			category.onDefault(categories[0]._id);
		}
	}, [activeModal]);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const submitData = {
			title: title.value,
			description: description.value,
			category: category.value,
			deadline: deadline.value,
			estimationTotal: estimationTotal.value,
			priority: priority.value,
		};
		if (mode === 'edit') {
			editTask({
				...submitData,
				_id: editedTask?._id,
			});
		} else {
			createTask(submitData);
		}
		setActiveModal(false);
	}

	function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setActiveModal(false);
	}

	return (
		<Modal
			activeModal={activeModal}
			isDisabled={isDisabled}
			mode={mode}
			onSubmit={onSubmit}
			handleClose={handleClose}
		>
			<Input legendText='Title:' error={title.error} isDirty={title.isDirty}>
				<input
					type='text'
					placeholder='Enter title here'
					value={title.value}
					onChange={(e) => title.onChange(e)}
					onBlur={() => title.onBlur()}
				/>
			</Input>
			<Input
				legendText='Description:'
				error={description.error}
				isDirty={description.isDirty}
			>
				<input
					type='text'
					placeholder='Enter description here'
					value={description.value}
					onChange={(e) => description.onChange(e)}
					onBlur={() => description.onBlur()}
				/>
			</Input>
			<Select
				labelText='Category:'
				categories={categories}
				error={category.error}
				onChange={(e) => category.onChange(e)}
				value={editedTask?.category}
				isDirty={category.isDirty}
			/>
			<Input
				legendText='Deadline:'
				error={deadline.error}
				isDirty={deadline.isDirty}
			>
				<input
					type='date'
					value={deadline.value}
					onChange={(e) => deadline.onChange(e)}
					onBlur={() => deadline.onBlur()}
				/>
			</Input>
			<Estimations
				editedTask={editedTask}
				mode={mode}
				error={estimationTotal.error}
				isDirty={estimationTotal.isDirty}
				onChange={estimationTotal.onChange}
			/>
			<Priority
				editedTask={editedTask}
				mode={mode}
				isDirty={priority.isDirty}
				error={priority.error}
				onChange={priority.onChange}
			/>
		</Modal>
	);
};

export default TaskModal;
