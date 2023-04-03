import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Transition } from 'react-transition-group';

import { Input } from '../../../common/Input';
import { Modal } from '../../../components/Modal';
import { Select } from '../../../common/Select';
import { Estimation } from './Estimation';

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
	estimation: number;
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
							type='text'
							labelText='Title:'
							placeholder='Enter title here'
							error={errors.title}
							register={register}
							registerData={[
								'title',
								{
									required: 'Must be filled',
									minLength: {
										value: 3,
										message: 'Min length 3',
									},
									maxLength: {
										value: 30,
										message: 'Max length 30',
									},
								},
							]}
						/>
						<Input
							type='text'
							labelText='Description:'
							placeholder='Enter description here'
							error={errors.description}
							register={register}
							registerData={[
								'description',
								{
									required: 'Must be filled',
									minLength: {
										value: 3,
										message: 'Min length 3',
									},
									maxLength: {
										value: 30,
										message: 'Max length 30',
									},
								},
							]}
						/>
						<Select
							labelText='Category:'
							categories={categories}
							register={register}
							registerData={[
								'category',
								{
									required: 'Must be filled',
								},
							]}
							error={errors.category}
						/>
						<Input
							type='date'
							labelText='Deadline:'
							placeholder='Enter deadline here'
							error={errors.deadline}
							register={register}
							registerData={[
								'deadline',
								{
									required: 'Must be filled',
								},
							]}
						/>
						<Estimation
							labelText='Estimation:'
							register={register}
							registerData={[
								'estimation',
								{
									required: 'Must be filled',
								},
							]}
						/>
					</Modal>
				);
			}}
		</Transition>
	);
};

export default TaskModal;
