import { FC } from 'react';
import styled from 'styled-components';

import {
	useDelCategoryMutation,
	useGetCategoriesQuery,
} from '../../../../store/categories/categoriesApi';
import { ICategory } from '../../../../types/Category';

import styles from './CategoriesList.module.scss';

interface ICategProps {
	color: string;
}

type CategListPropsType = {
	setEditedCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoriesList: FC<CategListPropsType> = ({
	setEditedCategory,
	setEditMode,
	setActiveModal,
}) => {
	const { data, isLoading, isFetching } = useGetCategoriesQuery();
	const [delCategory, {}] = useDelCategoryMutation();
	const CategoriesItem = styled.li`
		:before {
			background-color: ${(props: ICategProps) => props.color};
		}
	`;

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
