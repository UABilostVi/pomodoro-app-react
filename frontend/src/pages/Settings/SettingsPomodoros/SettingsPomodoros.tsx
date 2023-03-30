import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../common/Button';
import { Graph } from '../Graph';
import { SettingsItem } from '../SettingsItem';

import styles from './SettingsPomodoros.module.scss';

const SettingsPomodoros: FC = () => {
	const [workTime, setWorkTime] = useState(15);
	const [workIter, setWorkIter] = useState(3);
	const [shortBreak, setShortBreak] = useState(3);
	const [longBreak, setLongBreak] = useState(15);
	const navigate = useNavigate();

	function onClickHandler() {
		navigate('/tasklist');
	}

	return (
		<>
			<h2 className='subtitle'>Pomodoros settings</h2>
			<div className={styles.settingsContent}>
				<div className={styles.itemsWrapper}>
					<SettingsItem
						increase={(step) => setWorkTime((prev: number) => prev + step)}
						decrease={(step) => setWorkTime((prev: number) => prev - step)}
						value={workTime}
						title='Work time'
						option='workTime'
						max={25}
						min={15}
						step={5}
					/>
					<SettingsItem
						increase={(step) => setWorkIter((prev: number) => prev + step)}
						decrease={(step) => setWorkIter((prev: number) => prev - step)}
						value={workIter}
						title='Work iterations'
						option='workIter'
						max={5}
						min={2}
						step={1}
					/>
					<SettingsItem
						increase={(step) => setShortBreak((prev: number) => prev + step)}
						decrease={(step) => setShortBreak((prev: number) => prev - step)}
						value={shortBreak}
						title='Short break'
						option='shortBreak'
						max={5}
						min={3}
						step={1}
					/>
					<SettingsItem
						increase={(step) => setLongBreak((prev: number) => prev + step)}
						decrease={(step) => setLongBreak((prev: number) => prev - step)}
						value={longBreak}
						title='Long break'
						option='longBreak'
						max={30}
						min={15}
						step={5}
					/>
				</div>
				<Graph
					workTime={workTime}
					workIter={workIter}
					shortBreak={shortBreak}
					longBreak={longBreak}
				/>
				<div className='buttonsHolder'>
					<Button type='ok' onClickHandler={onClickHandler}>
						Go to Tasks
					</Button>
					<Button type='save'>Save</Button>
				</div>
			</div>
		</>
	);
};

export default SettingsPomodoros;
