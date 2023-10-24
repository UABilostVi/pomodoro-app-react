import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../common/Button';
import { CategoryModal } from '../CategoryModal';
import { CategoriesList } from './CategoriesList';
import { ICategory } from '../../../types/Category';
import { ModalModeType } from '../../../types/ModalModeType';

import styles from './SettingsCategories.module.scss';

const SettingsCategories: FC = () => {
	const navigate = useNavigate();
	const [activeModal, setActiveModal] = useState<boolean>(false);
	const [mode, setMode] = useState<ModalModeType>('add');
	const [editedCategory, setEditedCategory] = useState<ICategory | null>(null);

	function addHandler() {
		setMode('add');
		setActiveModal(true);
	}

	return (
		<>
			<h2 className='subtitle'>Categories list overview</h2>
			<div className={styles.settingsContent}>
				<CategoriesList
					setEditedCategory={setEditedCategory}
					setMode={setMode}
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
						onClickHandler={addHandler}
					>
						Add new
					</Button>
				</div>
			</div>
			<CategoryModal
				activeModal={activeModal}
				setActiveModal={setActiveModal}
				mode={mode}
				setMode={setMode}
				editedCategory={editedCategory}
				setEditedCategory={setEditedCategory}
			/>
		</>
	);
};

export default SettingsCategories;
