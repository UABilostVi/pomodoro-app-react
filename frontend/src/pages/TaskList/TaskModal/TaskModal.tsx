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
								placeholder='Enter deadline here'
								{...register('deadline', {
									required: 'Must be filled',
								})}
							/>
						</Input>
						<Input legendText='Estimations:' error={errors.estimations}>
							<div className={styles.estimationHolder}>
								<input
									className={styles.estimationsInput}
									type='radio'
									value={5}
									{...register('estimations', {
										required: 'Must be filled',
									})}
								/>
								<input
									className={styles.estimationsInput}
									type='radio'
									value={4}
									{...register('estimations', {
										required: 'Must be filled',
									})}
								/>
								<input
									className={styles.estimationsInput}
									type='radio'
									value={3}
									{...register('estimations', {
										required: 'Must be filled',
									})}
								/>
								<input
									className={styles.estimationsInput}
									type='radio'
									value={2}
									{...register('estimations', {
										required: 'Must be filled',
									})}
								/>
								<input
									className={styles.estimationsInput}
									type='radio'
									value={1}
									{...register('estimations', {
										required: 'Must be filled',
									})}
								/>
							</div>
						</Input>
						<Input legendText='Priority:' error={errors.priority}>
							<div className={styles.priorityWrapper}>
								<div className={styles.priorityHolder}>
									<input
										id='urgentradio'
										className={styles.urgentradio}
										type='radio'
										value='urgent'
										{...register('priority', {
											required: 'Must be filled',
										})}
									/>
									<label htmlFor='urgentradio'>Urgent</label>
								</div>
								<div className={styles.priorityHolder}>
									<input
										id='highradio'
										className={styles.highradio}
										type='radio'
										value='high'
										{...register('priority', {
											required: 'Must be filled',
										})}
									/>
									<label htmlFor='highradio'>High</label>
								</div>
								<div className={styles.priorityHolder}>
									<input
										id='middleradio'
										className={styles.middleradio}
										type='radio'
										value='middle'
										{...register('priority', {
											required: 'Must be filled',
										})}
									/>
									<label htmlFor='middleradio'>Middle</label>
								</div>
								<div className={styles.priorityHolder}>
									<input
										id='lowradio'
										className={styles.lowradio}
										type='radio'
										value='low'
										{...register('priority', {
											required: 'Must be filled',
										})}
									/>
									<label htmlFor='lowradio'>Low</label>
								</div>
							</div>
						</Input>
					</Modal>
				);
			}}
		</Transition>
	);
};

export default TaskModal;
