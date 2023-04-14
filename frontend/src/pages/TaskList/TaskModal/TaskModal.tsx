import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '../../../common/Input';
import { Modal } from '../../../components/Modal';
import { Select } from '../../../common/Select';

import { Priority } from '../../../types/Priority';

import styles from './TaskModal.module.scss';
import { useGetCategoriesQuery } from '../../../store/categories/categoriesApi';
import {
	useAddTaskMutation,
	useEditTaskMutation,
} from '../../../store/tasks/tasksApi';
import { ITask } from '../../../types/Tasks';

type TaskModalProps = {
	activeModal: boolean;
	setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
	editMode: boolean;
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	editedTask: ITask | null;
	setEditedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
};

const TaskModal: FC<TaskModalProps> = ({
	activeModal,
	setActiveModal,
	editMode,
	setEditMode,
	editedTask,
	setEditedTask,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<ITask>({ mode: 'onBlur' });

	const { data = [], error } = useGetCategoriesQuery();

	const [editTask, {}] = useEditTaskMutation();

	const [createTask, { error: addTaskError }] = useAddTaskMutation();

	const estimationsList = [...Array(5)].map((e, i) => {
		return (
			<input
				key={i}
				className={styles.estimationsInput}
				type='radio'
				value={++i}
				{...register('estimationTotal', {
					required: 'Must be filled',
				})}
			/>
		);
	});

	const onSubmit: SubmitHandler<ITask> = (data) => {
		console.log(data);

		// if (editMode) {
		// 	editTask({ ...data, _id: editedTask?._id });
		// 	setEditMode(false);
		// } else {
		// 	createTask(data);
		// }
		createTask(data);
		setActiveModal(false);
	};

	const priorityList = Object.keys(Priority).filter((v) => isNaN(Number(v)));
	const priorityRadios = priorityList.map((priority, index) => {
		return (
			<div key={index} className={styles.priorityHolder}>
				<input
					id={`${priority}radio`}
					className={styles[`${priority}radio`]}
					type='radio'
					value={priority}
					{...register('priority', {
						required: 'Must be filled',
					})}
				/>
				<label htmlFor={`${priority}radio`} className={styles.priorityLabel}>
					{priority}
				</label>
			</div>
		);
	});

	return (
		<>
			<Modal
				isValid={isValid}
				resetForm={reset}
				activeModal={activeModal}
				setActiveModal={setActiveModal}
				onSubmit={handleSubmit(onSubmit)}
				editMode={editMode}
				setEditMode={setEditMode}
			>
				<Input legendText='Title:' error={errors.title}>
					<input
						type='text'
						placeholder='Enter title here'
						{...register('title', {
							required: 'Must be filled',
							minLength: {
								value: 3,
								message: 'Min length 3',
							},
							maxLength: {
								value: 30,
								message: 'Max length 30',
							},
						})}
					/>
				</Input>
				<Input legendText='Description:' error={errors.description}>
					<input
						type='text'
						placeholder='Enter description here'
						{...register('description', {
							required: 'Must be filled',
							minLength: {
								value: 3,
								message: 'Min length 3',
							},
							maxLength: {
								value: 30,
								message: 'Max length 30',
							},
						})}
					/>
				</Input>
				<Select
					labelText='Category:'
					categories={data}
					register={register}
					error={errors.category}
					registerData={[
						'category',
						{
							required: 'Must be filled',
						},
					]}
				/>
				<Input legendText='Deadline:' error={errors.deadline}>
					<input
						type='date'
						{...register('deadline', {
							required: 'Must be filled',
						})}
					/>
				</Input>
				<Input legendText='Estimations:' error={errors.estimationUsed}>
					<div className={styles.estimationHolder}>{estimationsList}</div>
				</Input>
				<Input legendText='Priority:' error={errors.priority}>
					<div className={styles.priorityWrapper}>{priorityRadios}</div>
				</Input>
			</Modal>
		</>
	);
};

export default TaskModal;
