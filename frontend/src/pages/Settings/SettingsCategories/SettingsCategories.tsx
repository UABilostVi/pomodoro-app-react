import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CSSTransition, Transition } from 'react-transition-group';

import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';

import { Modal } from '../../../components/Modal';

import styles from './SettingsCategories.module.scss';

const categories = [
	{ id: 1, name: 'Work', color: 'orange' },
	{ id: 2, name: 'Educ', color: 'blue' },
	{ id: 3, name: 'Hobby', color: 'purple' },
];

interface ICategProps {
	key: number;
	color: string;
}

type FormValues = {
	name: string;
	color: string;
};

const SettingsCategories: FC = () => {
	const navigate = useNavigate();
	const [activeModal, setActiveModal] = useState(false);

	const CategoriesItem = styled.li`
		:before {
			background-color: ${(props: ICategProps) => props.color};
		}
	`;

	const categList = categories.map((item) => {
		return (
			<CategoriesItem
				key={item.id}
				className={styles.categItem}
				children={item.name}
				color={item.color}
			/>
		);
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormValues>({ mode: 'onChange' });

	return (
		<>
			<h2 className='subtitle'>Categories list overview</h2>
			<div className={styles.settingsContent}>
				<ul className={styles.categList}>{categList}</ul>
				<div className='buttonsHolder'>
					<Button
						buttonType='button'
						customType='ok'
						onClickHandler={() => navigate('/tasklist')}
					>
						Go to Tasks
					</Button>
					<Button
						buttonType='button'
						customType='save'
						onClickHandler={() => setActiveModal(true)}
					>
						Add new
					</Button>
				</div>
			</div>
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
		</>
	);
};

export default SettingsCategories;
