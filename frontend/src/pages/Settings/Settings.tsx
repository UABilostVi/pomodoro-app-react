import React, { FC, useState } from 'react';
import { Tabs } from '../../components/Tabs';

import { SettingsCategories } from './SettingsCategories';

import styles from './Settings.module.scss';

const Settings: FC = () => {
	const tabsList = ['Pomodoros', 'Categories'];
	const [toggleState, updateToggleState] = useState<string>(tabsList[0]);
	return (
		<div className={styles.settingsWrapper}>
			<Tabs
				tabsItems={tabsList}
				tabState={toggleState}
				setToggleState={updateToggleState}
			/>
			{toggleState === 'Categories' && <SettingsCategories />}
			{toggleState === 'Pomodoros' && <div>Pomodoros</div>}
		</div>
	);
};

export default Settings;
