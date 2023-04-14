import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../common/Button';
import { CategoryModal } from '../CategoryModal';
import { CategoriesList } from './CategoriesList';
import { ICategory } from '../../../types/Category';

import styles from './SettingsCategories.module.scss';

const SettingsCategories: FC = () => {
	const navigate = useNavigate();
	const [activeModal, setActiveModal] = useState<boolean>(false);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [editedCategory, setEditedCategory] = useState<ICategory | null>(null);

	return (
		<>
			<h2 className='subtitle'>Categories list overview</h2>
			<div className={styles.settingsContent}>
				<CategoriesList
					setEditedCategory={setEditedCategory}
					setEditMode={setEditMode}
					setActiveModal={setActiveModal}
				/>
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
			<CategoryModal
				activeModal={activeModal}
				setActiveModal={setActiveModal}
				editMode={editMode}
				setEditMode={setEditMode}
				editedCategory={editedCategory}
				setEditedCategory={setEditedCategory}
			/>
		</>
	);
};

export default SettingsCategories;
