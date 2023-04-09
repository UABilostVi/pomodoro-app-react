import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../common/Button';
import { AddCategoryModal } from '../AddCategoryModal';

import styles from './SettingsCategories.module.scss';
import { CategoriesList } from './CategoriesList';
import { ICategory } from '../../../types/Category';

const SettingsCategories: FC = () => {
	const navigate = useNavigate();
	const [activeModal, setActiveModal] = useState<boolean>(false);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [editedCategory, setEditedCategory] = useState<ICategory>();

	function onEdit(item: ICategory) {
		setEditedCategory(item);
		setEditMode(true);
		setActiveModal(true);
	}

	return (
		<>
			<h2 className='subtitle'>Categories list overview</h2>
			<div className={styles.settingsContent}>
				<CategoriesList onEdit={onEdit} />
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
				editedCategory={editedCategory}
				activeModal={activeModal}
				setActiveModal={setActiveModal}
				editMode={editMode}
				setEditMode={setEditMode}
			/>
		</>
	);
};

export default SettingsCategories;
