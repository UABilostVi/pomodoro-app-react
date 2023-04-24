import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../common/Button';
import { Graph } from '../Graph';
import { SettingsItem } from '../SettingsItem';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { changeSettings } from '../../../store/auth/async';

import styles from './SettingsPomodoros.module.scss';

const SettingsPomodoros: FC = () => {
	const { userInfo } = useAppSelector((state) => state.auth);

	const [worktime, setWorkTime] = useState<number>(userInfo?.settings.worktime);
	const [iterations, setWorkIter] = useState<number>(
		userInfo?.settings.iterations
	);
	const [shortbreak, setShortBreak] = useState<number>(
		userInfo?.settings.shortbreak
	);
	const [longbreak, setLongBreak] = useState<number>(
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
