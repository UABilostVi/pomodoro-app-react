import React from 'react';
import styles from './Tabs.module.scss';

interface TabsProps {
	tabsItems: string[];
	tabState: string;
	setToggleState: Function;
}

const Tabs = ({ tabsItems, tabState, setToggleState }: TabsProps) => {
	function toggleTab(tabName: string) {
		setToggleState(tabName);
	}

	const list = tabsItems.map((tab, index) => (
		<li
			key={tab}
			className={tabsItems.length !== index + 1 ? styles.tabItem : ''}
		>
			<button
				onClick={() => toggleTab(tab)}
				className={
					tabState === tab
						? styles.button + ' ' + styles.active
						: styles.button + ' ' + styles.inActive
				}
			>
				{tab}
			</button>
		</li>
	));
	return <ul className={styles.tabsWrapper}>{list}</ul>;
};

export default Tabs;
