import React from 'react';
import styles from './Tabs.module.scss';

interface ITabsProps {
	tabsItems: string[];
	tabState: string;
	setToggleState: (value: string) => void;
}

const Tabs = ({ tabsItems, tabState, setToggleState }: ITabsProps) => {
	function toggleTab(tabName: string) {
		setToggleState(tabName);
	}

	const list = tabsItems.map((tab, index) => (
		<li
			key={tab}
			className={
				styles.tabItem +
				' ' +
				(tabsItems.length !== index + 1 ? styles.rightBorder : '')
			}
		>
			<button
				onClick={() => toggleTab(tab)}
				className={
					styles.button +
					' ' +
					(tabState === tab ? styles.active : styles.inActive)
				}
			>
				{tab}
			</button>
		</li>
	));
	return <ul className={styles.tabsWrapper}>{list}</ul>;
};

export default Tabs;
