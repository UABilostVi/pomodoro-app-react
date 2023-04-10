import React, { FC, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../common/Button';
import { CategoryModal } from '../CategoryModal';
import { CategoriesList } from './CategoriesList';
import { ICategory } from '../../../types/Category';

import styles from './SettingsCategories.module.scss';

export const CategModalContext = createContext<any>(null);

const SettingsCategories: FC = () => {
	const navigate = useNavigate();
	const [activeModal, setActiveModal] = useState<boolean>(false);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [editedCategory, setEditedCategory] = useState<ICategory>();

	return (
		<>
			<CategModalContext.Provider
				value={{
					activeModal,
					setActiveModal,
					editMode,
					setEditMode,
					editedCategory,
					setEditedCategory,
				}}
			>
				<h2 className='subtitle'>Categories list overview</h2>
				<div className={styles.settingsContent}>
					<CategoriesList />
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
				<CategoryModal />
			</CategModalContext.Provider>
		</>
	);
};

export default SettingsCategories;
