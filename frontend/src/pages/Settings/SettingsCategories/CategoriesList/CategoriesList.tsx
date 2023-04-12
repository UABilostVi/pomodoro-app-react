import { FC, useContext } from 'react';
import styled from 'styled-components';

import {
	useDelCategoryMutation,
	useGetCategoriesQuery,
} from '../../../../store/categories/categoriesApi';
import { ICategory } from '../../../../types/Category';
import { CategModalContext } from '../SettingsCategories';

import styles from './CategoriesList.module.scss';

interface ICategProps {
	color: string;
}

const CategoriesList: FC = () => {
	const { data, isLoading, isFetching } = useGetCategoriesQuery();
	const [delCategory, {}] = useDelCategoryMutation();
	const CategoriesItem = styled.li`
		:before {
			background-color: ${(props: ICategProps) => props.color};
		}
	`;

	const { setEditedCategory, setActiveModal, setEditMode } =
		useContext(CategModalContext);

	function onEdit(item: ICategory) {
		setEditedCategory(item);
		setEditMode(true);
		setActiveModal(true);
	}

	return (
		<>
			<ul className={styles.categList}>
				{data?.map((item: ICategory) => {
					return (
						<CategoriesItem
							key={item._id}
							className={styles.categItem}
							color={item.color}
						>
							{item.name}
							<div className={styles.categButtonsHolder}>
								<button
									className={`${styles.categButton} icon-edit`}
									onClick={() => onEdit(item)}
								></button>
								<button
									className={`${styles.categButton} icon-delete`}
									onClick={() => delCategory(item)}
								></button>
							</div>
						</CategoriesItem>
					);
				})}
			</ul>
		</>
	);
};

export default CategoriesList;
