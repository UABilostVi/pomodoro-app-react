import React from 'react';
import { ReactComponent as ReactLogo } from '../../../assets/svg/tomato-addv02.svg';

import styles from './NoTaskLeft.module.scss';

const NoTaskLeft = () => {
	return (
		<div className={styles.banner}>
			<div className={styles.bannerHolder}>
				<ReactLogo className={styles.svgPom} />
				<p className={styles.bannerText}>
					You don’t have any tasks left. Add new tasks to stay productive.
				</p>
			</div>
		</div>
	);
};

export default NoTaskLeft;
