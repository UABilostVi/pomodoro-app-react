import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Transition } from 'react-transition-group';

import { Modal } from '../../../components/Modal';
import { Input } from '../../../common/Input';

type AddCategoryModalProps = {
	activeModal: boolean;
	setActiveModal: (state: boolean) => void;
};

type FormValues = {
	name: string;
	color: string;
};

const AddCategoryModal: FC<AddCategoryModalProps> = ({
	activeModal,
	setActiveModal,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormValues>({ mode: 'onChange' });

	return (
		<Transition in={activeModal} timeout={200} mountOnEnter unmountOnExit>
			{(state) => {
				return (
					<Modal
						transitionClass={state}
						setActive={setActiveModal}
						title='Add category'
						isValid={isValid}
						handleSubmit={handleSubmit}
					>
						<Input
							type='text'
							labelText='Name:'
							placeholder='Enter category name'
							error={errors.name}
							register={register}
							registerData={[
								'name',
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
							type='color'
							labelText='Choose color:'
							placeholder='Enter color'
							error={errors.color}
							register={register}
							registerData={[
								'color',
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

export default AddCategoryModal;
