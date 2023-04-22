import React, { FC } from 'react';

import styles from './Graph.module.scss';
import { IUserSettings } from '../../../types/User';

const Graph: FC<IUserSettings> = ({
	worktime,
	iterations,
	shortbreak,
	longbreak,
}) => {
	const fullCycleTime =
		longbreak + (iterations * worktime + (iterations - 1) * shortbreak) * 2;
	const firstCycle =
		longbreak + (iterations * worktime + (iterations - 1) * shortbreak);
	const longBreakPercent = `${(longbreak / fullCycleTime) * 100}%`;
	const shortBreakPercent = `${(longbreak / fullCycleTime) * 100}%`;
	const workTimePercent = `${(worktime / fullCycleTime) * 100}%`;
	const fullCycleHours = Math.trunc(fullCycleTime / 60);
	const fullCycleminutes = fullCycleTime % 60;
	const firstCycleHours = Math.trunc(firstCycle / 60);
	const firstCycleminutes = firstCycle % 60;
	const firstCyclePercent = `${(firstCycle / fullCycleTime) * 100}%`;

	const halfCycle = [...Array(iterations)].map((e, i) => {
		return (
			<React.Fragment key={i}>
				<div
					className={styles.workTime}
					style={{ width: workTimePercent }}
				></div>
				{i !== iterations - 1 && (
					<div
						className={styles.shortBreak}
						style={{ width: shortBreakPercent }}
					></div>
				)}
			</React.Fragment>
		);
	});

	const hoursMarkers = [...Array(fullCycleHours)].map((e, i) => {
		const markerPosition = ((60 * (i + 1)) / fullCycleTime) * 100;
		return (
			<span
				key={i}
				className={`${styles.marker} ${styles.hoursMarker}`}
				style={{ left: `${markerPosition}%` }}
			>{`${i + 1}h`}</span>
		);
	});

	return (
		<div className={styles.graph}>
			<h2 className={styles.title}>Your cycle</h2>
			<div className={styles.markersHolder}>
				<span className={`${styles.marker} ${styles.graphTimeMarker}`}>0h</span>
				<span
					className={`${styles.marker} ${styles.graphTimeMarker}`}
					style={{ left: firstCyclePercent }}
				>{`First cycle: ${firstCycleHours}h ${firstCycleminutes}m`}</span>
				<span
					className={`${styles.marker} ${styles.graphTimeMarker} ${styles.fullTimeMarker}`}
				>{`${fullCycleHours}h ${fullCycleminutes}m`}</span>
			</div>
			<div className={styles.graphBar}>
				{halfCycle}
				<div
					className={styles.longBreak}
					style={{ width: longBreakPercent }}
				></div>
				{halfCycle}
			</div>
			<div className={styles.markersHolder}>{hoursMarkers}</div>
		</div>
	);
};

export default Graph;
