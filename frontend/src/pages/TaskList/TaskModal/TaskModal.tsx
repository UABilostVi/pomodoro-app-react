import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '../../../common/Input';
import { Modal } from '../../../components/Modal';
import { Select } from '../../../common/Select';

import { Priority } from '../../../types/Priority';

import styles from './TaskModal.module.scss';
import {
	useAddCategoryMutation,
	useGetCategoriesQuery,
} from '../../../store/categories/categoriesApi';

type TaskModalProps = {
	activeModal: boolean;
	setActiveModal: (state: boolean) => void;
};

type FormValues = {
	title: string;
	description: string;
	deadline: string;
	category: string;
	estimations: number;
	priority: string;
};

const TaskModal: FC<TaskModalProps> = ({ activeModal, setActiveModal }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormValues>({ mode: 'onBlur' });

	const { data = [], isLoading } = useGetCategoriesQuery();

	const [createCategory, {}] = useAddCategoryMutation();

	const estimationsList = [...Array(5)].map((e, i) => {
		return (
			<input
				key={i}
				className={styles.estimationsInput}
				type='radio'
				value={++i}
				{...register('estimations', {
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

	return (
		<>
			{/* <Modal
				editedCategory=''
				activeModal={activeModal}
				setActive={setActiveModal}
				title='Add task'
				isValid={isValid}
				handleSubmit={handleSubmit}
				handleCheck={createCategory}
				resetForm={reset}
			> */}
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
			<Input legendText='Estimations:' error={errors.estimations}>
				<div className={styles.estimationHolder}>{estimationsList}</div>
			</Input>
			<Input legendText='Priority:' error={errors.priority}>
				<div className={styles.priorityWrapper}>{priorityRadios}</div>
			</Input>
			{/* </Modal> */}
		</>
	);
};

export default TaskModal;
