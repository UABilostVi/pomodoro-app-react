import React, { FC, useState } from 'react';
import { Tabs } from '../../components/Tabs';

import styles from './Settings.module.scss';

const Settings = () => {
	let tabsList = ['Pomodoros', 'Categories'];
	let [toggleState, setToggleState] = useState(tabsList[0]);
	return (
		<>
			<Tabs
				tabsItems={tabsList}
				tabState={toggleState}
				setToggleState={setToggleState}
			/>
			<div
				className={toggleState === tabsList[0] ? styles.visible : styles.hidden}
			>
				Pomodoro
			</div>
			<div
				className={toggleState === tabsList[1] ? styles.visible : styles.hidden}
			>
				Categories
			</div>
		</>
	);
};

export default Settings;
