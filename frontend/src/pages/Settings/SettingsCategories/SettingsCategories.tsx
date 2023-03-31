import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '../../../common/Button';

import styles from './SettingsCategories.module.scss';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../common/Input';

const categories = [
	{ id: 1, name: 'Work', color: 'orange' },
	{ id: 2, name: 'Educ', color: 'blue' },
	{ id: 3, name: 'Hobby', color: 'purple' },
];

interface ICategProps {
	key: number;
	color: string;
}

const CategoriesItem = styled.li`
	:before {
		background-color: ${(props: ICategProps) => props.color};
	}
`;

const SettingsCategories: FC = () => {
	const navigate = useNavigate();
	const [activeModal, setActiveModal] = useState(false);

	type FormValues = {
		name: string;
		color: string;
	};

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
	} = useForm<FormValues>({ mode: 'onBlur' });

	return (
		<>
			<h2 className='subtitle'>Categories list overview</h2>
			<div className={styles.settingsContent}>
				<ul className={styles.categList}>{categList}</ul>
				<div className='buttonsHolder'>
					<Button type='ok' onClickHandler={() => navigate('/tasklist')}>
						Go to Tasks
					</Button>
					<Button type='save' onClickHandler={() => setActiveModal(true)}>
						Add new
					</Button>
				</div>
			</div>

			<Modal
				active={activeModal}
				setActive={setActiveModal}
				title='Add category'
				isValid={isValid}
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
				<label className={styles.colorLabel}>
					Color:
					<input type='color' className={styles.colorInput} />
				</label>
			</Modal>
		</>
	);
};

export default SettingsCategories;
