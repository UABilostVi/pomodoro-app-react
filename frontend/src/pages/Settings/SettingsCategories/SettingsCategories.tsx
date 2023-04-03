import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '../../../common/Button';
import { AddCategoryModal } from '../AddCategoryModal';

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
			<AddCategoryModal
				activeModal={activeModal}
				setActiveModal={setActiveModal}
			/>
		</>
	);
};

export default SettingsCategories;
