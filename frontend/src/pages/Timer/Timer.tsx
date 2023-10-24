import React, { FC } from 'react';
import styles from './Timer.module.scss';
import { Button } from '../../common/Button';

const Timer: FC = () => {
	return (
		<div className={styles.timer}>
			<h2 className={styles.title}>Task title</h2>
			<h5 className={styles.description}>Task description</h5>
			<div className='buttonsHolder'>
				<Button customType='save' buttonType={'button'} children={'Start'} />
				{/* <Button
					customType='cancel'
					buttonType={'button'}
					children={'Restare'}
				/> */}
			</div>
		</div>
	);
};

export default Timer;
