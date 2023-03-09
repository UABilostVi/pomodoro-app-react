import React from 'react';
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

const SettingsCategories = () => {
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
			<ul className={styles.categList}>{categList}</ul>
			<Button type='ok'>Go to Tasks</Button>
		</>
	);
};

export default SettingsCategories;
