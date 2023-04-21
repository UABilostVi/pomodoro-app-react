import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../common/Button';
import { Graph } from '../Graph';
import { SettingsItem } from '../SettingsItem';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './SettingsPomodoros.module.scss';
import { changeSettings } from '../../../store/auth/async';

const SettingsPomodoros: FC = () => {
	const { userInfo } = useAppSelector((state) => state.auth);

	const [workTime, setWorkTime] = useState<number>(userInfo?.settings.worktime);
	const [workIter, setWorkIter] = useState<number>(
		userInfo?.settings.iterations
	);
	const [shortBreak, setShortBreak] = useState<number>(
		userInfo?.settings.shortbreak
	);
	const [longBreak, setLongBreak] = useState<number>(
		userInfo?.settings.longbreak
	);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	return (
		<>
			<h2 className='subtitle'>Pomodoros settings</h2>
			<div className={styles.settingsContent}>
				<div className={styles.itemsWrapper}>
					<SettingsItem
						setValue={setWorkTime}
						value={workTime}
						title='Work time'
						option='workTime'
						max={25}
						min={15}
						step={5}
					/>
					<SettingsItem
						setValue={setWorkIter}
						value={workIter}
						title='Work iterations'
						option='workIter'
						max={5}
						min={2}
						step={1}
					/>
					<SettingsItem
						setValue={setShortBreak}
						value={shortBreak}
						title='Short break'
						option='shortBreak'
						max={5}
						min={3}
						step={1}
					/>
					<SettingsItem
						setValue={setLongBreak}
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
						onClickHandler={() =>
							dispatch(
								changeSettings({
									worktime: workTime,
									iterations: workIter,
									shortbreak: shortBreak,
									longbreak: longBreak,
								})
							)
						}
					>
						Save
					</Button>
				</div>
			</div>
		</>
	);
};

export default SettingsPomodoros;
