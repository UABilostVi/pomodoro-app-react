import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../common/Button';
import { Graph } from '../Graph';
import { SettingsItem } from '../SettingsItem';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { changeSettings } from '../../../store/auth/async';

import styles from './SettingsPomodoros.module.scss';

const SettingsPomodoros: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { userInfo } = useAppSelector((state) => state.auth);

	const [worktime, setWorkTime] = useState<number>(0);
	const [iterations, setWorkIter] = useState<number>(0);
	const [shortbreak, setShortBreak] = useState<number>(0);
	const [longbreak, setLongBreak] = useState<number>(0);

	useEffect(() => {
		setLongBreak(userInfo.settings.longbreak);
		setShortBreak(userInfo.settings.shortbreak);
		setWorkIter(userInfo.settings.iterations);
		setWorkTime(userInfo.settings.worktime);
	}, [userInfo.settings]);

	return (
		<>
			<h2 className='subtitle'>Pomodoros settings</h2>
			<div className={styles.settingsContent}>
				<div className={styles.itemsWrapper}>
					<SettingsItem
						setValue={setWorkTime}
						value={worktime}
						title='Work time'
						option='worktime'
						max={25}
						min={15}
						step={5}
					/>
					<SettingsItem
						setValue={setWorkIter}
						value={iterations}
						title='Work iterations'
						option='iterations'
						max={5}
						min={2}
						step={1}
					/>
					<SettingsItem
						setValue={setShortBreak}
						value={shortbreak}
						title='Short break'
						option='shortbreak'
						max={5}
						min={3}
						step={1}
					/>
					<SettingsItem
						setValue={setLongBreak}
						value={longbreak}
						title='Long break'
						option='longbreak'
						max={30}
						min={15}
						step={5}
					/>
				</div>
				<Graph
					worktime={worktime}
					iterations={iterations}
					shortbreak={shortbreak}
					longbreak={longbreak}
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
								changeSettings({ worktime, iterations, shortbreak, longbreak })
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
