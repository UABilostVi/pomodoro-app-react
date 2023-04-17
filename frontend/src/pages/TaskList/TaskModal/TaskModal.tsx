import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

import { Priority } from '../../../types/Priority';
import { ITask } from '../../../types/Tasks';
import { ModalModeType } from '../../../types/ModalModeType';

import { Input } from '../../../common/Input';
import { Select } from '../../../common/Select';
import { Button } from '../../../common/Button';

import { useGetCategoriesQuery } from '../../../store/categories/categoriesApi';
import {
	useAddTaskMutation,
	useEditTaskMutation,
} from '../../../store/tasks/tasksApi';

import styles from './TaskModal.module.scss';

type TaskModalProps = {
	activeModal: boolean;
	setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
	mode: ModalModeType;
	editedTask?: ITask | null;
};

const TaskModal: FC<TaskModalProps> = ({
	activeModal,
	setActiveModal,
	mode,
	editedTask,
}) => {
	useEffect(() => {
		if (mode === 'edit' && editedTask) {
			setValue('title', `${editedTask?.title}`);
			setValue('description', `${editedTask?.description}`);
			setValue('category', `${editedTask?.category}`);
			setValue(
				'deadline',
				`${new Date(editedTask.deadline).toISOString().substr(0, 10)}`
			);
			setValue('priority', `${editedTask?.priority}`);
		} else {
			setValue('title', '');
			setValue('description', '');
			setValue('category', '');
			setValue('deadline', '');
			setValue('priority', '');
		}
	}, [editedTask, mode]);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm<ITask>({
		mode: 'onBlur',
	});

	const { data: categories = [] } = useGetCategoriesQuery();
	const [editTask] = useEditTaskMutation();
	const [createTask] = useAddTaskMutation();

	const modalRoot = document.getElementById('root-modal') as HTMLElement;

	const onSubmit: SubmitHandler<any> = (data) => {
		console.log(data);

		if (mode === 'edit') {
			editTask({ ...data, _id: editedTask?._id });
		} else {
			createTask(data);
		}
		setActiveModal(false);
	};

	function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setActiveModal(false);
	}

	const estimationsList = [...Array(5)].map((e, i) => {
		const val = (i - 5) * -1;
		const isChecked = val === editedTask?.estimationTotal;

		return (
			<input
				key={val}
				className={styles.estimationsInput}
				type='radio'
				value={val}
				defaultChecked={isChecked}
				{...register('estimationTotal', {
					required: 'Must be filled',
				})}
			/>
		);
	});

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

	return ReactDOM.createPortal(
		<Transition in={activeModal} timeout={200} mountOnEnter unmountOnExit>
			{(state) => {
				return (
					<div className={`modal ${state}`}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={`modalContent ${state}`}
						>
							<ul className={`ModalButtonsHolder`}>
								<li>
									<button
										type='button'
										className={`modalButton icon-close`}
										onClick={handleClose}
									></button>
								</li>
								<li>
									<button
										type='submit'
										className={`modalButton icon-check`}
										disabled={!isValid}
									></button>
								</li>
							</ul>
							<div>
								<h2 className={`modalTitle`}>{mode}</h2>
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
									categories={categories}
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
								<Input legendText='Estimations:' error={errors.estimationTotal}>
									<div className={styles.estimationHolder}>
										{estimationsList}
									</div>
								</Input>
								<Input legendText='Priority:' error={errors.priority}>
									<div className={styles.priorityWrapper}>{priorityRadios}</div>
								</Input>
							</div>
							<div className={`phoneButtonsHolder`}>
								<Button
									buttonType='button'
									customType='cancel'
									onClickHandler={handleClose}
								>
									Cancel
								</Button>
								<Button
									buttonType='submit'
									customType='save'
									disabled={!isValid}
								>
									Save
								</Button>
							</div>
						</form>
					</div>
				);
			}}
		</Transition>,
		modalRoot
	);
};

export default TaskModal;
