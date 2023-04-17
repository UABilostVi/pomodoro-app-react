import { FC } from 'react';

import {
	useDelCategoryMutation,
	useGetCategoriesQuery,
} from '../../../../store/categories/categoriesApi';
import { ICategory } from '../../../../types/Category';
import { ModalModeType } from '../../../../types/ModalModeType';

import styles from './CategoriesList.module.scss';

type CategListPropsType = {
	setEditedCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
	setMode: React.Dispatch<React.SetStateAction<ModalModeType>>;
	setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoriesList: FC<CategListPropsType> = ({
	setEditedCategory,
	setMode,
	setActiveModal,
}) => {
	const { data } = useGetCategoriesQuery();
	const [delCategory] = useDelCategoryMutation();

	function onEdit(item: ICategory) {
		setEditedCategory(item);
		setMode('edit');
		setActiveModal(true);
	}

	return (
		<>
			<ul className={styles.categList}>
				{data?.map((item: ICategory) => {
					return (
						<li key={item._id} className={styles.categItem}>
							{item.name}
							<span
								className={styles.categColorMark}
								style={{ backgroundColor: `${item.color}` }}
							></span>
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
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default CategoriesList;
