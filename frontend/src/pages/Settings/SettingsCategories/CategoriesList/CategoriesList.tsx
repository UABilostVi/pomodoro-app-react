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

type CategoriesListProps = {
	onEdit: (item: ICategory) => void;
};

const CategoriesList: FC<CategoriesListProps> = ({ onEdit }) => {
	const { data, isLoading } = useGetCategoriesQuery();
	const [delCategory, {}] = useDelCategoryMutation();
	const CategoriesItem = styled.li`
		:before {
			background-color: ${(props: ICategProps) => props.color};
		}
	`;

	return (
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
	);
};

export default CategoriesList;
