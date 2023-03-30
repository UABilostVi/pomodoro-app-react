import React, { FC } from 'react';

import styles from './Graph.module.scss';

type CyclePropsType = {
	workTime: number;
	workIter: number;
	shortBreak: number;
	longBreak: number;
};

const Graph: FC<CyclePropsType> = ({
	workTime,
	workIter,
	shortBreak,
	longBreak,
}) => {
	const fullCycleTime =
		longBreak + (workIter * workTime + (workIter - 1) * shortBreak) * 2;
	const firstCycle =
		longBreak + (workIter * workTime + (workIter - 1) * shortBreak);
	const longBreakPercent = `${(longBreak / fullCycleTime) * 100}%`;
	const shortBreakPercent = `${(shortBreak / fullCycleTime) * 100}%`;
	const workTimePercent = `${(workTime / fullCycleTime) * 100}%`;
	const fullCycleHours = Math.trunc(fullCycleTime / 60);
	const fullCycleminutes = fullCycleTime % 60;
	const firstCycleHours = Math.trunc(firstCycle / 60);
	const firstCycleminutes = firstCycle % 60;
	const firstCyclePercent = `${(firstCycle / fullCycleTime) * 100}%`;

	const halfCycle = [...Array(workIter)].map((e, i) => {
		return (
			<React.Fragment key={i}>
				<div
					className={styles.workTime}
					style={{ width: workTimePercent }}
				></div>
				{i !== workIter - 1 && (
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
