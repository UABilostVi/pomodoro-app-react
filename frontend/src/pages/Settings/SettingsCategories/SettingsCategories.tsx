import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '../../../common/Button';

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

const CategoriesItem = styled.li`
	:before {
		background-color: ${(props: ICategProps) => props.color};
	}
`;

const SettingsCategories: FC = () => {
	const navigate = useNavigate();

	function onClickHandler() {
		navigate('/tasklist');
	}

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
					<Button type='ok' onClickHandler={onClickHandler}>
						Go to Tasks
					</Button>
				</div>
			</div>
		</>
	);
};

export default SettingsCategories;
