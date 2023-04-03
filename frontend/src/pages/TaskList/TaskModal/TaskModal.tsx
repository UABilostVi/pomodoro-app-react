import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Transition } from 'react-transition-group';

import { Input } from '../../../common/Input';
import { Modal } from '../../../components/Modal';
import { Select } from '../../../common/Select';

import styles from './TaskModal.module.scss';

const categories = [
	{ id: '1', name: 'Work', color: 'orange' },
	{ id: '2', name: 'Educ', color: 'blue' },
	{ id: '3', name: 'Hobby', color: 'purple' },
];

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
		formState: { errors, isValid },
	} = useForm<FormValues>({ mode: 'onBlur' });

	return (
		<Transition in={activeModal} timeout={200} mountOnEnter unmountOnExit>
			{(state) => {
				return (
					<Modal
						transitionClass={state}
						setActive={setActiveModal}
						title='Add task'
						isValid={isValid}
						handleSubmit={handleSubmit}
					>
						<Input
							labelFor='titleInput'
							labelText='Title:'
							error={errors.title}
						>
							<input
								id='titleInput'
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
						<Input
							labelFor='descriptionInput'
							labelText='Description:'
							error={errors.description}
						>
							<input
								id='descriptionInput'
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
						<Input
							labelFor='dateInput'
							labelText='Deadline:'
							error={errors.deadline}
						>
							<input
								id='dateInput'
								type='date'
								placeholder='Enter deadline here'
								{...register('deadline', {
									required: 'Must be filled',
								})}
							/>
						</Input>
						<Input labelText='Estimations:' error={errors.estimations}>
							<div className={styles.estimationHolder}>
								<input
									type='radio'
									value={5}
									{...register('estimations', {
										required: 'Must be filled',
									})}
								/>
								<input
									type='radio'
									value={4}
									{...register('estimations', {
										required: 'Must be filled',
									})}
								/>
								<input
									type='radio'
									value={3}
									{...register('estimations', {
										required: 'Must be filled',
									})}
								/>
								<input
									type='radio'
									value={2}
									{...register('estimations', {
										required: 'Must be filled',
									})}
								/>
								<input
									type='radio'
									value={1}
									{...register('estimations', {
										required: 'Must be filled',
									})}
								/>
							</div>
						</Input>
						{/* <Input labelText='Priority:' error={errors.priority}>
							<input
								type='radio'
								value={5}
								{...register('priority', {
									required: 'Must be filled',
								})}
							/>
						</Input>
						<Input labelText='Priority:' error={errors.priority}>
							<input
								type='radio'
								value={5}
								{...register('priority', {
									required: 'Must be filled',
								})}
							/>
						</Input> */}
					</Modal>
				);
			}}
		</Transition>
	);
};

export default TaskModal;
