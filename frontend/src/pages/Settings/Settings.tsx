import React, { FC, useState } from 'react';
import { Tabs } from '../../components/Tabs';

import { SettingsCategories } from './SettingsCategories';
import { SettingsPomodoros } from './SettingsPomodoros';

import styles from './Settings.module.scss';

const Settings: FC = () => {
	const tabsList = ['Pomodoros', 'Categories'];
	const [toggleState, updateToggleState] = useState<string>(tabsList[1]);
	return (
		<div className={styles.settingsWrapper}>
			<Tabs
				tabsItems={tabsList}
				tabState={toggleState}
				setToggleState={updateToggleState}
			/>
			{toggleState === 'Categories' && <SettingsCategories />}
			{toggleState === 'Pomodoros' && <SettingsPomodoros />}
		</div>
	);
};

export default Settings;
